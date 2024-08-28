import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { createToken } from "../utils/createToken";
import APIError from "../utils/apiError";


export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.create(req.body);
    const token = createToken({_id: user._id});
    res.status(201).json({ token, data: user });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.body);
    const user = await userModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new APIError('Invalid email or password', 401);
    }
    const token = createToken({_id: user._id});
    res.status(200).json({ token, message: 'logged in successfully' });
  });
  
  export const protectRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1- check if token found
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else { throw new APIError('login first to access the application', 401); }
    // 2- check if token not expired
    const decodedToken: any = Jwt.verify(token, process.env.PRIVATE_KEY!);
    // 3- check if user exist
    const currentUser = await userModel.findById(decodedToken._id);
    if (!currentUser) { throw new APIError("user doesn't exist", 401); }
    // 4- check if password changed
    if (currentUser.passwordChangedAt instanceof Date) {
      const changedPasswordTime: number = (currentUser.passwordChangedAt.getTime() / 1000);
      if (changedPasswordTime > decodedToken.iat) { throw new APIError('please login again', 401); }
    }
    req.user = currentUser;
    next();
  });
  
  export const allowedTo = (...roles: string[]) => asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!(roles.includes(req.user?.role ?? ''))) {
      throw new APIError("you can't access this", 403);
    }
    next();
  });
  
  export const checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.active) {
      throw new APIError('your account is not active', 403);
    }
    next();
  });
