"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const categoryValidators_1 = require("../utils/validators/categoryValidators");
const categoryRouter = (0, express_1.Router)();
categoryRouter.route("")
    .post(categoryValidators_1.createCategoryValidator, categoryController_1.createCategory)
    .get(categoryController_1.listCategories);
categoryRouter.route("/:id")
    .get(categoryValidators_1.getCategoryValidator, categoryController_1.getCategory)
    .patch(categoryValidators_1.updateCategoryValidator, categoryController_1.updateCategory)
    .delete(categoryValidators_1.deleteCategoryValidator, categoryController_1.deleteCategory);
exports.default = categoryRouter;
