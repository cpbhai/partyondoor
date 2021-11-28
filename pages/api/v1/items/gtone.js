import connectDB from "../../../../utils/connectDB";
import Item from "../../../../models/itemModel";
import Auth from "../../../../utils/auth";
import Pagination from "../../../../utils/paginate";

connectDB();

const ItemAPI = async (req, res) => {
  const midwr = await Auth(req.headers.authorization);
  if (midwr.success) {
    if (midwr.user.type !== "client") {
      return res
        .status(403)
        .json({ success: false, message: "You are not allowed." });
    }
    req.user = midwr.user;
  } else {
    return res.status(401).json(midwr);
  }
  switch (req.method) {
    case "GET":
      await GET_met(req, res);
      break;
  }
};

const GET_met = async (req, res) => {
  try {
    const { state, city } = req.user;
    const { keyword, page, limit, category, subcategory } = req.query;
    let filt = {};
    if (category) filt.category = category;
    if (subcategory) filt.subcategory = subcategory;
    filt.state = state;
    filt.city = city;
    let items = await Item.find(filt),
      totalPages = 1;

    /*Keyword Match Begin*/
    const pattern = new RegExp(keyword, "i");
    if (keyword) items = items.filter(({ title }) => title.match(pattern));
    /*Keyword Match End*/

    /*Pagination Begin*/
    totalPages = Math.ceil(parseFloat(items.length) / limit);
    items = Pagination(items, limit, page);
    /*Pagination End*/

    res.status(200).json({
      success: true,
      items,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default ItemAPI;
