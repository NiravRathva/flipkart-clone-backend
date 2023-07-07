import Reviews from "../models/reviewsModel.js";
import {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from "./handleFactory.js";

export const createReview = createOne(Reviews);
export const getReviews = getAll(Reviews);
export const updateReview = updateOne(Reviews);
export const deleteReview = deleteOne(Reviews);
