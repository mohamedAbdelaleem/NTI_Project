import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, resizeAndSave, updateProduct, uploadProductImages } from "../controllers/productController";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validators/productValidators";
import reviewRouter from "./reviewRoutes";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
const productsRouter: Router = Router();

productsRouter.route('/')
  .get(getProducts)
  .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), uploadProductImages, resizeAndSave, createProductValidator, createProduct);

productsRouter.route('/:id')
  .get(getProductValidator, getProduct)
  .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateProductValidator, updateProduct)
  .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteProductValidator, deleteProduct);

productsRouter.use("/:productId/reviews", reviewRouter)

export default productsRouter;