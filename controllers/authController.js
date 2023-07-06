import User from "../models/userModel.js";

export const signUp = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
