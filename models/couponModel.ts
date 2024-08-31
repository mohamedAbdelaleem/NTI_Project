import { Schema, model } from "mongoose";
import Coupon from "../interfaces/coupon"


const couponSchema: Schema = new Schema<Coupon>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        expireTime: {
            type: Date, required: true
        },
        discount: {
            type: Number, required: true, min: 1, max: 100
        }
    },
    {
        timestamps: true
    }
);


export default model<Coupon>("Coupon", couponSchema);