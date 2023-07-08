import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import { appError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
//get cart
export const getCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (cart && cart.length > 0) {
    res.json(cart);
  } else {
    next(new appError("cart is empty ", 404));
  }
});


