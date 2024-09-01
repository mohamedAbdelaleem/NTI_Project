import { RequestHandler } from "express";
import { check } from "express-validator";
import subCategoryModel from "../../models/subCategoryModel";
import validatorMiddleware from "../../middlewares/validatorMiddleWare";

export const createCategoryValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Category Name is Required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
  validatorMiddleware
]

export const updateCategoryValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Category Name is Required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
  validatorMiddleware
]

export const getCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, {req}) => req.__('check_id')),
  validatorMiddleware
]

export const deleteCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, {req}) => req.__('check_id'))
    .custom(async (val) => {
        await subCategoryModel.deleteMany({ categoryId: val });
        return true;
    }),
  validatorMiddleware
]