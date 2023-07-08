import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide userId"],
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0
}
});

export default mongoose.model("Cart", cartSchema);
