import connectDB from "../../../../utils/connectDB";
import Auth from "../../../../utils/auth";
import Item from "../../../../models/itemModel";
import Partner from "../../../../models/partnerModel";

connectDB();

const Analyt = async (req, res) => {
  const midwr = await Auth(req.headers.authorization);
  if (midwr.success) {
    if (midwr.user.type !== "partner") {
      return res
        .status(403)
        .json({ success: false, message: "You are not allowed." });
    }
    req.userId = midwr.user._id;
  } else {
    return res.status(401).json(midwr);
  }
  switch (req.method) {
    case "GET":
      await Analyt_get(req, res);
      break;
  }
};

const Analyt_get = async (req, res) => {
  try {
    const itemsPosted = await Item.find({ postedBy: req.userId });
    res.status(200).json({ success: true, analytics: { itemsPosted } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export default Analyt;
