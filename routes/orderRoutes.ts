import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
import { createOrder, setUserParam, getOrder, getOrders, setOrderAsPaid, setOrderAsDelivered } from "../controllers/orderController";
import { createOrderValidator, getOrderValidator } from "../utils/validators/orderValidators";

const ordersRouter: Router = Router();
ordersRouter.use(protectRoutes, checkActive)

ordersRouter.route('/')
  .get(setUserParam, getOrders)
  .post(allowedTo('user'), createOrderValidator, createOrder);

ordersRouter.route('/:id').get(getOrderValidator, getOrder)

ordersRouter.use(allowedTo('manager', 'admin'))
ordersRouter.route('/:id/paid').put(getOrderValidator, setOrderAsPaid)
ordersRouter.route('/:id/delivered').put(getOrderValidator, setOrderAsDelivered)

export default ordersRouter;