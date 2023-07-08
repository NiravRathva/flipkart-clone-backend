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

export const addToCart = catchAsync(async (req, res, next) => {
  // const { productId, quantity } = req.body;
  const { cartItems } = req.body;
  const userId = req.params.id;
  const [{ quantity, productId }] = cartItems;

  let cart = await Cart.findOne({ userId });
  let item = await Product.findOne({ _id: productId });
  if (!item) {
    res.status(404).send("Item not found!");
  }
  const price = item.price;
  const name = item.title;

  if (cart) {
    // if cart exists for the user
    let itemIndex = cart.cartItems.findIndex((p) => p.productId == productId);
    console.log(itemIndex);
    // Check if product exists or not
    if (itemIndex > -1) {
      let productItem = cart.cartItems[itemIndex];
      productItem.quantity += quantity;
      cart.cartItems[itemIndex] = productItem;
    } else {
      cart.cartItems.push({ productId, name, quantity, price });
    }
    cart.bill += quantity * price;
    cart = await cart.save();
    return res.status(201).send(cart);
  } else {
    // no cart exists, create one
    const newCart = await Cart.create({
      userId,
      items: [{ productId, name, quantity, price }],
      bill: quantity * price,
    });
    return res.status(201).send(newCart);
  }
});
