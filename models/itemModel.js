const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can not be empty."],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is missing."],
    },
    subcategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
      required: [true, "SubCategory is missing."],
    },
    description: {
      type: String,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        postedBy: {
          type: mongoose.Schema.ObjectId,
          ref: "Client",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Partner",
      required: true,
    },
    country: { type: String, default: "IN" },
    state: { type: String, required: [true, "State is missing."] },
    city: { type: String, required: [true, "City is missing."] },
    costByDeps: [
      {
        unit: {
          type: String,
          required: true,
        },
        cost: {
          type: Number,
          required: true,
        },
        desc: {
          type: String,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Item || mongoose.model("Item", itemSchema);
