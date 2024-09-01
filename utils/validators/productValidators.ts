import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleWare";
import categoryModel from "../../models/categoryModel";
import subCategoryModel from "../../models/subCategoryModel";
import SubCategory  from "../../interfaces/subCategory";

export const createProductValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Subcategory Name is Required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
  check('description')
    .notEmpty().withMessage('description required')
    .isLength({ min: 2, max: 500 }),
  check('price')
    .notEmpty().withMessage('Product Price required')
    .isNumeric().withMessage('price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),
  check('priceAfterDiscount').optional()
    .isNumeric().withMessage('price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),
  check('quantity').optional()
    .isNumeric().withMessage('price must be number').toInt()
    .custom((val: number) => {
      if (val < 0) {
        throw new Error('Invalid Quantity')
      }
      return true
    }),
  check('category')
    .notEmpty().withMessage('Category is Required')
    .isMongoId().withMessage((val, {req}) => req.__('check_id'))
    // * Check if category exist
    .custom(async (val) => {
      const category = await categoryModel.findById(val);
      if (!category) {
        throw new Error('Category Not Found');
      }
      return true;
    }),
  check('subcategory')
    .notEmpty().withMessage('subcategory is Required')
    .isMongoId().withMessage((val, {req}) => req.__('check_id'))
    // * Check if subcategory exist
    .custom(async (val, { req }) => {
      const subcategory: SubCategory | null = await subCategoryModel.findById(val);
      if (!subcategory) {
        throw new Error('Subcategory Not Found');
      }
      if (subcategory.categoryId._id!.toString() !== req.body.category.toString()) {
        throw new Error('subcategory not exist in category')
      }
      return true;
    }),
  validatorMiddleware
]

export const updateProductValidator: RequestHandler[] = [
  check('name')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
  check('description')
    .optional()
    .isLength({ min: 2, max: 500 }),
  check('price')
    .optional()
    .isNumeric().withMessage('price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),
  check('priceAfterDiscount').optional()
    .isNumeric().withMessage('price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0 || val > 1000000) {
        throw new Error('Invalid Price')
      }
      return true
    }),
  check('quantity').optional()
    .isNumeric().withMessage('price must be number').toInt()
    .custom((val: number) => {
      if (val < 0) {
        throw new Error('Invalid Quantity')
      }
      return true
    }),
  check('category')
    .optional()
    .isMongoId().withMessage((val, {req}) => req.__('check_id'))
    // * Check if category exist
    .custom(async (val) => {
      const category = await categoryModel.findById(val);
      if (!category) {
        throw new Error('Category Not Found');
      }
      return true;
    }),
  check('subcategory')
    .optional()
    .isMongoId().withMessage((val, {req}) => req.__('check_id'))
    // * Check if subcategory exist
    .custom(async (val, { req }) => {
      const subcategory: SubCategory | null = await subCategoryModel.findById(val);
      if (!subcategory) {
        throw new Error('Subcategory Not Found');
      }
      if (subcategory.categoryId._id!.toString() !== req.body.category.toString()) {
        throw new Error('subcategory not exist in category')
      }
      return true;
    }),
  validatorMiddleware
]

export const getProductValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, {req}) => req.__('check_id')),
  validatorMiddleware
]

export const deleteProductValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, {req}) => req.__('check_id')),
  validatorMiddleware
]