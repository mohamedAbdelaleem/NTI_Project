import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleWare";
import couponModel from "../../models/couponModel";

export const createCouponValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Coupon Name is Required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50')
    .custom(async (val: string) => {
      const coupon = await couponModel.findOne({ name: val });
      if (coupon) { throw new Error('coupon name already exist') }
      return true;
    }),
  check('expireTime')
    .notEmpty().withMessage('coupon expire time required')
    .isDate().withMessage('Invalid Date'),
  check('discount')
    .notEmpty().withMessage('Discount required')
    .isNumeric().withMessage('Discount must be a number')
    .custom((val) => {
      if (val <= 0 || val > 100) {
        throw new Error('invalid Discount value')
      }
      return true;
    }),
  validatorMiddleware
]

export const updateCouponValidator: RequestHandler[] = [
  check('name').optional()
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
  check('expireTime').optional()
    .isDate().withMessage('Invalid Date'),
  check('discount')
    .notEmpty().withMessage('Discount required')
    .isNumeric().withMessage('Discount must be a number')
    .custom((val) => {
      if (val <= 0 || val > 100) {
        throw new Error('invalid Discount value')
      }
      return true;
    }),
  validatorMiddleware
]

export const getCouponValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, {req}) => req.__('check_id')),
  validatorMiddleware
]

export const deleteCouponValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage((val, {req}) => req.__('check_id')),
  validatorMiddleware
]