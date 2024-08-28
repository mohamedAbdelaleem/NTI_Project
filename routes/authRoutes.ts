import { Router } from "express";
import {  login, signup } from "../controllers/auth";
import { createUserValidator } from "../utils/validators/userValidators";
import { resizeUserImage, uploadUserImage } from "../controllers/userController";

const authRouter: Router = Router();

authRouter.route('/signup').post(uploadUserImage, resizeUserImage, createUserValidator, signup);
authRouter.route('/login').post(login);

// authRouter.route('/:id')
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

export default authRouter;