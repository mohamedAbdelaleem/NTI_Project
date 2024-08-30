import { NextFunction, Request, Response } from "express";
import Review from "../interfaces/review";
import reviewModel from "../models/reviewModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./genericHandler";
import { createReviewValidator } from "../utils/validators/reviewValidators";


export const setProductIdAndUserId = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.product){
        req.body.product = req.params.productId;
    }
    req.body.user = req.user?._id;
    next();
}

export const createReview = createOne<Review>(reviewModel);

export const listReviews = getAll<Review>(reviewModel, "Review");

export const getReview = getOne<Review>(reviewModel);

export const updateReview = updateOne<Review>(reviewModel);

export const deleteReview = deleteOne<Review>(reviewModel, async (document: Review) =>{
    await (reviewModel as any).calcRatingAndQuantity(document.product._id);
});