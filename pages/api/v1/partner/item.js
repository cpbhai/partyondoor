import connectDB from "../../../../utils/connectDB";
import Auth from "../../../../utils/auth";
import Item from "../../../../models/itemModel";

connectDB();
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }

const ItemComp = async (req, res) => {
  const midwr = await Auth(req.headers.authorization);
  if (midwr.success) {
    if (midwr.user.type !== "partner") {
      return res
        .status(403)
        .json({ success: false, message: "You are not allowed." });
    }
    req.user = midwr.user;
  } else {
    return res.status(401).json(midwr);
  }
  switch (req.method) {
    case "POST":
      await Item_save(req, res);
      break;
  }
};

const Item_save = async (req, res) => {
  req.body.postedBy = req.user._id; //postedBy
  req.body.state = req.user.state;
  req.body.city = req.user.city;
  try {
    await Item.create(req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default ItemComp;
