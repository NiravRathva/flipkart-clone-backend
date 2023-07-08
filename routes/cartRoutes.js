import express from "express";
import { getCart } from "../controllers/cartController.js";

const router = express.Router();

router.route("/:id").get(getCart);

export default router;
