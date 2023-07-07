import express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/").get(getReviews).post(createReview);
router.route("/:id").patch(updateReview).delete(deleteReview);

export default router;
