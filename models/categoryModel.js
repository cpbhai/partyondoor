const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty."],
    },
    public_id: {
      type: String,
      required: [true, "Public Id is missing."],
    },
    url: {
      type: String,
      required: [true, "Url is missing."],
    },
    type: String,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
