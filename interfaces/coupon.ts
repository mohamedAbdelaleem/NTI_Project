import { Document } from "mongoose";

interface Coupon extends Document{
    name: string,
    expireTime: Date;
    discount: number;
}

export default Coupon;