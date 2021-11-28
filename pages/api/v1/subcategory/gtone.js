import connectDB from "../../../../utils/connectDB";
import SubCategory from "../../../../models/subCategoryModel";

connectDB();

const SubCategoryGTOne = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAll(req, res);
      break;
  }
};

const getAll = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json({ success: true, subcategories });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export default SubCategoryGTOne;
