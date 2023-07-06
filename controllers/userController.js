import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
//get all users
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({ result: users.length, data: users });
});

// get single user
export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(201).json(user);
});

//update user
export const updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json(updatedUser);
});

//delete user
export const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(201).json("user has been deleted");
});
