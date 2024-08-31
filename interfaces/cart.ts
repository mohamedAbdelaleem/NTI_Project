import { Document } from "mongoose";
import { Products } from "./product";
import User from "./user";

export interface CartItem extends Document {
    product: Products;
    quantity: number
}

interface Cart extends Document {
    cartItems: CartItem[];
    totalPrice: number;
    totalPriceAfterDiscount: number | undefined;
    user: User;
  }

export default Cart;