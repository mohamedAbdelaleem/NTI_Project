import { Router } from "express";
import { changeUserPassword, createUser, deleteUser, getUser, getUsers, resizeUserImage, updateUser, uploadUserImage } from "../controllers/userController";
import { changeLoggedUserPasswordValidator, changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, updateLoggedUserValidator, updateUserValidator } from "../utils/validators/userValidators";
import { allowedTo, changeLoggedInUserPassword, checkActive, protectRoutes, setUserID } from "../controllers/auth";

const usersRouter: Router = Router();

usersRouter.use(protectRoutes, checkActive)
usersRouter.route('/me')
  .get(setUserID, getUser)
  .put(updateLoggedUserValidator);

usersRouter.route('/changePassword')
  .put(changeLoggedUserPasswordValidator, changeLoggedInUserPassword);


usersRouter.use(allowedTo('manager'))
usersRouter.route('/')
  .get(getUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

usersRouter.route('/:id')
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

usersRouter.put('/:id/changePassword', changeUserPasswordValidator, changeUserPassword)

export default usersRouter;