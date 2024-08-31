import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
import { addProductToCart, applyCoupon, clearCart, getLoggedUserCart, removeProduct, updateProductQuantity } from "../controllers/cartController";
import { addProductToCartValidator, removeProductFromCartValidator, updateProductQuantityValidator } from "../utils/validators/cartValidators";

const cartsRouter: Router = Router();
cartsRouter.use(protectRoutes, checkActive, allowedTo('user'))

cartsRouter.route('/')
  .get(getLoggedUserCart)
  .post(addProductToCartValidator, addProductToCart)
  .delete(clearCart);

cartsRouter.put('/applyCoupon', applyCoupon)

cartsRouter.route('/:itemId') // TODO: item id is belong to object id
  .put(updateProductQuantityValidator, updateProductQuantity)
  .delete(removeProductFromCartValidator, removeProduct);

export default cartsRouter;