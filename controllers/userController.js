import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json({ result: users.length, data: users });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json("user has been deleted");
  } catch (error) {
    console.log(error);
  }
};
