import { CartItem } from "./cart";
import { User } from "./user";

export interface Order {
    _id: string;
    cartItems: CartItem[];
    totalPrice: number;
    paymentMethod: string;
    isDelivered: boolean;
    isPaid: boolean;
    taxPrice: number;
    address: string;
    user: User;
    createdAt: string;
    updatedAt: string;
  }