import connectDB from "../../../../utils/connectDB";
import Item from "../../../../models/itemModel";

connectDB();

const ItemAPI = async (req, res) => {
  switch (req.method) {
    case "GET":
      await GET_met(req, res);
      break;
  }
};

const GET_met = async (req, res) => {
  try {
    const item = await Item.findById(req.query.w).populate("postedBy");
    if (!item)
      return res
        .status(422)
        .json({ success: false, message: "No such Item found." });
    res.status(200).json({
      success: true,
      item,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "No such Item found." });
  }
};

export default ItemAPI;
