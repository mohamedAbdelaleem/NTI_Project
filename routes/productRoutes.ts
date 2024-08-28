import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, upload } from "../controllers/productController";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validators/productValidators";
const productsRouter: Router = Router();

productsRouter.route('/')
  .get(getProducts)
  .post(upload.single('cover'), createProductValidator, createProduct);

productsRouter.route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default productsRouter;