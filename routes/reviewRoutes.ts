import { Router } from "express";
import { createReview, deleteReview, getReview, listReviews, setProductIdAndUserId, updateReview } from "../controllers/reviewController";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
import { createReviewValidator, deleteReviewValidator, updateReviewValidator } from "../utils/validators/reviewValidators";

const reviewRouter: Router = Router({ mergeParams: true });

reviewRouter.route("")
.post(protectRoutes, checkActive, allowedTo("user"), setProductIdAndUserId, createReviewValidator, createReview)
.get(listReviews)

reviewRouter.route("/:id")
.get(getReview)
.patch(protectRoutes, checkActive, allowedTo("user"), setProductIdAndUserId, updateReviewValidator, updateReview)
.delete(protectRoutes, checkActive, allowedTo("user", "manager", "admin"), deleteReviewValidator, deleteReview);

export default reviewRouter;
