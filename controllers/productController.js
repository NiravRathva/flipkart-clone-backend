import Product from "../models/productModel.js";
import {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from "./handleFactory.js";

export const createProduct = createOne(Product);
export const getProducts = getAll(Product);
export const getProduct = getOne(Product);
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);
