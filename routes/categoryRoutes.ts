import { Router } from "express";
import { createCategory, deleteCategory, getCategory, listCategories, updateCategory } from "../controllers/categoryController";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validators/categoryValidators";
import subCategoryRouter from "./subCategoryRoutes";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";


const categoryRouter: Router = Router();



categoryRouter.route("")
.post(protectRoutes, checkActive, allowedTo('manager', 'admin'),  createCategoryValidator, createCategory)
.get(listCategories);

categoryRouter.route("/:id")
.get(getCategoryValidator, getCategory)
.patch(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateCategoryValidator, updateCategory)
.delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteCategoryValidator, deleteCategory);

categoryRouter.use('/:categoryId/subcategories', subCategoryRouter);

export default categoryRouter;