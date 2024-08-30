import { RequestHandler } from "express"
import { check } from "express-validator"
import reviewModel from "../../models/reviewModel"
import APIError from "../apiError";
import validatorMiddleware from "../../middlewares/validatorMiddleWare";

export const createReviewValidator: RequestHandler[] = [
    check("content").notEmpty().withMessage("Review Content Message is Required"),
    check('rating').notEmpty().withMessage('rating Required'),
    check('user')
    .notEmpty().withMessage('user Required')
    .isMongoId().withMessage('invalid Mongo id'),

    check('product')
    .notEmpty().withMessage('product Required')
    .isMongoId().withMessage('Invalid Mongo Id')
    .custom( async (val, {req}) => {
        const review = await reviewModel.findOne({user: req.user._id, product: val});
        if(review){
            throw new APIError("Just one review per product is allowed for a user", 400);
        }
        return true;
    }),
    validatorMiddleware

]


export const updateReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id')
      .custom(async (val, { req }) => {
        const review = await reviewModel.findById(val);
        if (!review) { throw new Error('review not found') }
        if (review.user._id!.toString() !== req.user._id.toString()) {
          throw new Error('you are not allowed to perform this action')
        }
        return true;
      }),
    validatorMiddleware
  ]
  
  export const getReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
  ]
  
  export const deleteReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id')
      .custom(async (val, { req }) => {
        if (req.user.role === 'user') {
          const review = await reviewModel.findById(val);
          if (!review) { throw new Error('review not found') }
          if (review.user._id!.toString() !== req.user._id.toString()) {
            throw new Error('you are not allowed to perform this action')
          }
        }
        return true;
      }),
    validatorMiddleware
  ]