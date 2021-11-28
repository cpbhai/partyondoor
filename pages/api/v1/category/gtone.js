import connectDB from "../../../../utils/connectDB";
import Category from "../../../../models/categoryModel";

connectDB();

const CategoryGTOne = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAll(req, res);
      break;
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export default CategoryGTOne;
