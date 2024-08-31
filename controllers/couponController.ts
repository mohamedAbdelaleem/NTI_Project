
import couponModel from "../models/couponModel";
import Coupon from "../interfaces/coupon";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./genericHandler";


export const createCoupon = createOne<Coupon>(couponModel);

export const listCoupons = getAll<Coupon>(couponModel, "Coupon");

export const getCoupon = getOne<Coupon>(couponModel);

export const updateCoupon = updateOne<Coupon>(couponModel);

export const deleteCoupon = deleteOne<Coupon>(couponModel);
