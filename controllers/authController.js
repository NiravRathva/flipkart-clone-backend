import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { appError } from "../utils/appError.js";

//sign token 
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//signUp function
export const signUp = catchAsync(async (req, res, next) => {
  //create new user using data from reqest body
  const newUser = await User.create({
    name: req.body.name,
    mobileNo: req.body.mobileNo,
    email: req.body.email,
    password: req.body.password,
  });
  //generate JSON web token
  const token = signToken(newUser._id);
  // Respond with a success status code and the user object along with the token
  res.status(201).json({ newUser, token });
});

// signIn function
export const signIn = catchAsync(async (req, res, next) => {
  const { email, mobileNo, password } = req.body;
  //check if email or mobileNo and password if exist
  if (!(email || mobileNo) || !password) {
    next(new appError("please provide email or mobileNO and password", 400));
  }

  // check if the user exits
  const user = await User.findOne({ $or: [{ email }, { mobileNo }] }).select(
    "+password"
  );

  // const correct = await user.correctPassword(req.body.password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    next(new appError("wrong Credentials", 401));
  }

  const token = signToken(user._id);
  //sending response
  res.status(200).json({ status: "success", token });
});
