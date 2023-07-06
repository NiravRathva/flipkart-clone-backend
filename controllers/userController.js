import User from "../models/userModel.js";
import { getOne, getAll, updateOne, deleteOne } from "./handleFactory.js";
//get all users
export const getAllUsers = getAll(User);

// get single user
export const getUser = getOne(User);

//update user
export const updateUser = updateOne(User);

//delete user
export const deleteUser = deleteOne(User);
