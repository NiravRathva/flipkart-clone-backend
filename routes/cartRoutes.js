import express from "express";
import { addToCart, getCart } from "../controllers/cartController.js";

const router = express.Router();

router.route("/:id").get(getCart).post(addToCart);

export default router;
