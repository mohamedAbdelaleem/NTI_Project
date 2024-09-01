import orderModel from "../models/orderModel";
import Order from "../interfaces/order";
import { getAll, getOne } from "./genericHandler";
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import cartModel from "../models/cartModel";
import APIError from "../utils/apiError";
import { CartItem } from "../interfaces/cart";
import productModel from "../models/productModels";

// Set user param to filter against it in `getAll` generic controller 
export const setUserParam = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role === 'user') {
    req.params.user = req.user?.id;
  }
  next();
};

// get all orders
export const getOrders = getAll<Order>(orderModel, 'Order')

// get one order
export const getOrder = getOne<Order>(orderModel)


// create order
export const createOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // 0 tax price
  const taxPrice: number = 100;
  // 1 Get user cart
  const cart = await cartModel.findOne({ user: req.user?._id });
  if (!cart) { throw new APIError('cart not found', 404) };
  // 2 get order price
  const cartPrice: number = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  const totalOrderPrice: number = cartPrice + taxPrice;
  // 3 create order
  const order: Order = await orderModel.create({
    user: req.user?._id,
    totalPrice: totalOrderPrice,
    address: req.body.address,
    cartItems: cart.cartItems,
    taxPrice
  })
  // 4 delete cart, update product quantity and sold
  if (order) {
    const bulkOption = cart.cartItems.map((item: CartItem) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
      }
    }))
    await productModel.bulkWrite(bulkOption);
    await cartModel.findByIdAndDelete(cart._id);
  }
  res.status(201).json({ data: order })
});

// update order [isPaid, isDelivered]
export const setOrderAsPaid = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const order = await orderModel.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: Date.now()
  }, { new: true })
  if (!order) { throw new APIError('order not found', 404) };
  res.status(200).json({ data: order })
});

export const setOrderAsDelivered = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  const order = await orderModel.findByIdAndUpdate(req.params.id, {
    isDelivered: true,
    deliveredAt: Date.now()
  }, { new: true })
  if (!order) { throw new APIError('order not found', 404) };
  res.status(200).json({ data: order })
});