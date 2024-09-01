import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import cartModel from '../models/cartModel';
import APIErrors from '../utils/apiError';
import productModel from '../models/productModels';
import  Cart, { CartItem } from '../interfaces/cart';
import couponModel from '../models/couponModel';

// Get user cart
export const getLoggedUserCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const cart = await cartModel.findOne({ user: req.user?._id });
  if (!cart) {
    return next(new APIErrors("this user don't have cart yet", 404))
  };
  res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// Add product to cart
export const addProductToCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const product = await productModel.findById(req.body.product);
  if (!product) {
    return next(new APIErrors('Product Not found', 404))
  }
  let cart = await cartModel.findOne({ user: req.user?._id });
  if (!cart) {
    cart = await cartModel.create({
      user: req.user?._id,
      cartItems: [{ product: req.body.product }]
    });
  }
  else {
    const productIndex = cart.cartItems.findIndex((item: CartItem) => item.product._id!.toString() === req.body.product.toString());
    if (productIndex > -1) {
      cart.cartItems[productIndex].quantity += 1;
    }
    else {
      cart.cartItems.push({ product: req.body.product, quantity: 1 } as CartItem)
    }
  }
  calcTotalPrice(cart)
  await cart.save();
  res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// remove product from cart
export const removeProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const cart = await cartModel.findOneAndUpdate({ user: req.user?._id }, {
    $pull: { cartItems: { _id: req.params.itemId } }
  }, { new: true });

  if(!cart){
    throw new APIErrors("No cart exists for this user", 404);
  }
  calcTotalPrice(cart);
  await cart.save();
  res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// update product quantity
export const updateProductQuantity = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const cart = await cartModel.findOne({ user: req.user?._id });
  if (!cart) { return next(new APIErrors("this user don't have cart yet", 404)) }
  const productIndex = cart.cartItems.findIndex((item: CartItem) => item._id!.toString() === req.params.itemId.toString());
  if (productIndex > -1) {
    cart.cartItems[productIndex].quantity = req.body.quantity;
    calcTotalPrice(cart);
  } else {
    return next(new APIErrors("product not found in cart", 404))
  }
  await cart.save();
  res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// Apply coupon
export const applyCoupon = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const coupon = await couponModel.findOne({
    name: req.body.name,
    expireTime: { $gt: Date.now() }
  });
  if (!coupon) { return next(new APIErrors('invalid or expired coupon', 400)) }
  const cart: any = await cartModel.findOne({ user: req.user?._id });
  const totalPrice: number = cart.totalPrice;
  const totalPriceAfterDiscount = (totalPrice - (totalPrice * (coupon.discount / 100))).toFixed(2);
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  await cart.save();
  res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// clear cart
export const clearCart = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await cartModel.findOneAndDelete({ user: req.user?._id });
  res.status(204).json();
});

// calc total cart price
const calcTotalPrice = (cart: Cart): number => {
  let totalPrice: number = 0;
  cart.cartItems.forEach((item: CartItem) => {
    totalPrice += item.quantity * item.product.price;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
}