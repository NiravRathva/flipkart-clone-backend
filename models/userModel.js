import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please provide user role"],
    enum: ["customer", "seller", "admin"],
  },
});

//password hashing middleware
userSchema.pre("save", async function (next) {
  //return if password is not modified
  if (!this.isModified("password")) return next();
  //hashing the password
  this.password = await bcrypt.hash(this.password, 12);
});

// correct password method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //check enterd password and password saved in database are same
  return await bcrypt.compare(candidatePassword, userPassword);
};
export default mongoose.model("User", userSchema);
