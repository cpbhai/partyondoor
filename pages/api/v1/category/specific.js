import connectDB from "../../../../utils/connectDB";
import Category from "../../../../models/categoryModel";

connectDB();

const CategoryComponent = async (req, res) => {
  switch (req.method) {
    case "POST":
      await Category_save(req, res);
      break;
  }
};

const Category_save = async (req, res) => {
  try {
    await Category.create(req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    const message =
      err.code === 11000
        ? `${Object.values(err.keyValue)[0]} already exists.`
        : err.message;
    res.status(500).json({ success: false, message });
  }
};

export default CategoryComponent;
