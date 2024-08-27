import { Router } from "express";
import { createSubCategory, deleteSubCategory, getSubCategory, listSubCategories, updateSubCategory } from "../controllers/subCategoryController";
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from "../utils/validators/subCategoryValidators";

const subCategoryRouter: Router = Router({ mergeParams: true });

subCategoryRouter.route("")
.post(createSubcategoryValidator, createSubCategory)
.get(listSubCategories)

subCategoryRouter.route("/:id")
.get(getSubcategoryValidator, getSubCategory)
.patch(updateSubcategoryValidator, updateSubCategory)
.delete(deleteSubcategoryValidator, deleteSubCategory)

export default subCategoryRouter;
