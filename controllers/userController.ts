import { Request, Response, NextFunction } from "express";
import  User  from "../interfaces/user";
import userModel from "../models/userModel";
import { createOne, deleteOne, getAll, getOne } from "./genericHandler";
import asyncHandler from 'express-async-handler';
import APIError from "../utils/apiError";
import { uploadSingleFile } from "../middlewares/uploadImages";
import sharp from "sharp";
import bcrypt from 'bcrypt';


export const createUser = createOne<User>(userModel);

export const getUsers = getAll<User>(userModel, 'users');
export const getUser = getOne<User>(userModel);

export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    image: req.body.image,
    active: req.body.active
  }, { new: true })
  if (!user) { throw new APIError('user not found', 404) };
  res.status(200).json({ data: user, message: 'user updated successfully' })
});

export const deleteUser = deleteOne<User>(userModel);

export const uploadUserImage = uploadSingleFile('image');
export const resizeUserImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const imageName: string = `user-${Date.now()}.jpeg`;
    console.log(imageName);
    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${imageName}`)
    req.body.image = imageName;
  }
  next();
});


export const changeUserPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, {
    password: await bcrypt.hash(req.body.password, 13),
    passwordChangedAt: Date.now()
  }, { new: true })
  if (!user) { throw new APIError('user not found', 404) }
  res.status(200).json({ message: 'user password changed successfully', data: user })
});