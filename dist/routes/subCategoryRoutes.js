"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subCategoryController_1 = require("../controllers/subCategoryController");
const subCategoryValidators_1 = require("../utils/validators/subCategoryValidators");
const subCategoryRouter = (0, express_1.Router)();
subCategoryRouter.route("")
    .post(subCategoryValidators_1.createSubcategoryValidator, subCategoryController_1.createSubCategory)
    .get(subCategoryController_1.listSubCategories);
subCategoryRouter.route("/:id")
    .get(subCategoryValidators_1.getSubcategoryValidator, subCategoryController_1.getSubCategory)
    .patch(subCategoryValidators_1.updateSubcategoryValidator, subCategoryController_1.updateSubCategory)
    .delete(subCategoryValidators_1.deleteSubcategoryValidator, subCategoryController_1.deleteSubCategory);
exports.default = subCategoryRouter;
