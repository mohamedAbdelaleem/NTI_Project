import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import crypto from "crypto"
import Jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { createResetToken, createToken } from "../utils/createToken";
import APIError from "../utils/apiError";
import sendEmail from "../utils/sendMail";


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

export const setUserID = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.user?._id?.toString() as string;
  next();
});

export const changeLoggedInUserPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findByIdAndUpdate(req.user?._id, {
    password: await bcrypt.hash(req.body.password, 13),
    passwordChangedAt: Date.now()
  }, {new: true});

  const newToken = createToken({id: user?._id});
  res.status(200).json({token: newToken, user: user});
  
});

export const forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findOne({email: req.body.email});
  if (!user) {throw new APIError("Unable to send Email", 400);};

  const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetCode = crypto.createHash('sha256').update(randomCode).digest('hex');
  user.resetCodeExpireTime = Date.now() + (10 * 60 * 1000);
  user.resetCodeVerify = false;
  const message = `Your reset code is ${randomCode}`;
  
  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset Password',
      message: message
    });
    await user.save();
  } catch (error) {
    console.log(error);
    throw new APIError("Unable to send Email", 500);
  }
  
  const resetToken = createResetToken({id: user._id});
  res.status(200).json({ msg: 'Reset password code sent to your email', resetToken: resetToken });
});


export const verifyResetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let resetToken: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    resetToken = req.headers.authorization.split(' ')[1];
  } else { throw new APIError('get your reset code first', 400) }
  const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_SECRET_KEY!);
  const hashedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
  const user = await userModel.findOne({
    _id: decodedToken._id,
    resetCode: hashedResetCode,
    resetCodeExpireTime: { $gt: Date.now() }
  })
  if (!user) { throw new APIError('invalid or expired reset code', 400) };
  user.resetCodeVerify = true;
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({ message: 'reset code verified' });
});

export const resetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let resetToken: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    resetToken = req.headers.authorization.split(' ')[1];
  } else { throw new APIError("you can't do this action", 400) }
  const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_SECRET_KEY!);
  const user = await userModel.findOne({
    _id: decodedToken._id,
    resetCodeVerify: true
  })
  if (!user) { throw new APIError('verify your reset code first', 400) };
  user.password = req.body.password;
  user.resetCode = undefined;
  user.resetCodeExpireTime = undefined;
  user.resetCodeVerify = undefined;
  user.passwordChangedAt = Date.now();
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({message:'your password has been changed'});
});
