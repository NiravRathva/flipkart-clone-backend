import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your Name"],
  },
  mobileNo: {
    type: Number,
    required: [true, "Please provide your Mobile Number "],
    unique: true,
    min: 1000000000,
    max: 9999999999,
  },
  email: {
    type: String,
    required: [true, "Please provide your email id"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
});
export default mongoose.model("User", userSchema);
