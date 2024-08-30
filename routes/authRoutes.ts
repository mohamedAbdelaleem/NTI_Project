import { Router } from "express";
import {  forgetPassword, login, signup } from "../controllers/auth";
import { createUserValidator } from "../utils/validators/userValidators";
import { resizeUserImage, uploadUserImage } from "../controllers/userController";
import { loginValidator, sendMailValidator, signupValidator } from "../utils/validators/authValidators";

const authRouter: Router = Router();

authRouter.route('/signup').post(uploadUserImage, resizeUserImage, signupValidator, signup);
authRouter.route('/login').post(loginValidator, login);
authRouter.route('/forgetPassword').post(sendMailValidator, forgetPassword);

// authRouter.route('/:id')
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

export default authRouter;