import { Router } from "express";
import { createCategory, deleteCategory, getCategory, listCategories, updateCategory } from "../controllers/categoryController";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validators/categoryValidators";
import subCategoryRouter from "./subCategoryRoutes";


const categoryRouter: Router = Router();



categoryRouter.route("")
.post(createCategoryValidator, createCategory)
.get(listCategories);

categoryRouter.route("/:id")
.get(getCategoryValidator, getCategory)
.patch(updateCategoryValidator, updateCategory)
.delete(deleteCategoryValidator, deleteCategory);

categoryRouter.use('/:categoryId/subcategories', subCategoryRouter);

export default categoryRouter;