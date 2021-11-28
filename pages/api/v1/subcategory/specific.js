import connectDB from "../../../../utils/connectDB";
import SubCategory from "../../../../models/subCategoryModel";

connectDB();

const SubCategoryComponent = async (req, res) => {
  switch (req.method) {
    case "GET":
      await SubCategory_get(req, res);
      break;
    case "POST":
      await SubCategory_save(req, res);
      break;
  }
};

const SubCategory_get = async (req, res) => {
  try {
    const { category } = req.query;
    const subcategories = await SubCategory.find({ category });
    res.status(200).json({ success: true, subcategories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const SubCategory_save = async (req, res) => {
  try {
    await SubCategory.create(req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    const message =
      err.code === 11000
        ? `${Object.values(err.keyValue)[0]} already exists.`
        : err.message;
    res.status(500).json({ success: false, message });
  }
};

export default SubCategoryComponent;
