const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty."],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is missing."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);
