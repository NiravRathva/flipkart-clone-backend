import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    //create new user using data from reqest body
    const newUser = await User.create({
      name: req.body.name,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
      password: req.body.password,
    });
    //generate JSON web token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    // Respond with a success status code and the user object along with the token
    res.status(201).json({ newUser, token });
  } catch (error) {
    console.log(error);
  }
};
