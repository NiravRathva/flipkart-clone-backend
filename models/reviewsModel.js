import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating for the product"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment for the product "],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Reviews", reviewsSchema);
