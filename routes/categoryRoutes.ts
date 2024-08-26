import { Router } from "express";
import { createCategory, deleteCategory, getCategory, listCategories, updateCategory } from "../controllers/categoryController";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validators/categoryValidators";


const categoryRouter: Router = Router();

categoryRouter.route("")
.post(createCategoryValidator, createCategory)
.get(listCategories);

categoryRouter.route("/:id")
.get(getCategoryValidator, getCategory)
.patch(updateCategoryValidator, updateCategory)
.delete(deleteCategoryValidator, deleteCategory);

export default categoryRouter;