import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
import { createCoupon, deleteCoupon, getCoupon, listCoupons, updateCoupon } from "../controllers/couponController";
import { createCouponValidator, deleteCouponValidator, getCouponValidator, updateCouponValidator } from "../utils/validators/couponValidators";


const couponRouter: Router = Router();
couponRouter.use(protectRoutes, checkActive, allowedTo('manager', 'admin'))


couponRouter.route("")
.post(createCouponValidator, createCoupon)
.get(listCoupons);

couponRouter.route("/:id")
.get(getCouponValidator, getCoupon)
.patch(updateCouponValidator, updateCoupon)
.delete(deleteCouponValidator, deleteCoupon);


export default couponRouter;