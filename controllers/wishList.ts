import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel';

export const addProductToWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findByIdAndUpdate(req.user?._id, {
    $addToSet: { wishlist: req.body.product }
  }, { new: true });
  res.status(200).json({ data: user?.wishlist })
});

export const removeProductFromWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findByIdAndUpdate(req.user?._id, {
    $pull: { wishlist: req.params.product }
  }, { new: true });
  res.status(200).json({ data: user?.wishlist })
});

export const getLoggedUserWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findById(req.user?._id).populate('wishlist');
  res.status(200).json({ length: user?.wishlist.length, data: user?.wishlist })
});

