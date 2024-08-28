import { Router } from "express";
import { changeUserPassword, createUser, deleteUser, getUser, getUsers, resizeUserImage, updateUser, uploadUserImage } from "../controllers/userController";
import { createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from "../utils/validators/userValidators";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";

const usersRouter: Router = Router();
usersRouter.use(protectRoutes, checkActive, allowedTo('manager'))
usersRouter.route('/')
  .get(getUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

usersRouter.route('/:id')
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

usersRouter.put('/:id/changePassword', changeUserPassword)

export default usersRouter;