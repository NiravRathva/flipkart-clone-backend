import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
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
    const token = signToken(newUser._id);
    // Respond with a success status code and the user object along with the token
    res.status(201).json({ newUser, token });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, mobileNo, password } = req.body;
    //check if email or mobileNo and password if exist
    if (!(email || mobileNo) || !password) {
      res.json("please provide email or mobileNO and password");
    }

    // check if the user exits
    const user = await User.findOne({ $or: [{ email }, { mobileNo }] }).select(
      "+password"
    );

    // const correct = await user.correctPassword(req.body.password, user.password);
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.json("wrong credentials");
    }

    const token = signToken(user._id);
    //sending response
    res.status(200).json({ status: "success", token });
  } catch (error) {
    console.log(error);
  }
};
