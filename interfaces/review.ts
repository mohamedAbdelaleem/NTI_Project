import { Document, Schema } from "mongoose";
import User from "./user";
import { Products } from "./product";

interface Review extends Document{
    content: string,
    rating: number,
    user: User,
    product: Products
}

export default Review;