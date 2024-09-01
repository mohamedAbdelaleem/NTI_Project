import { Document } from "mongoose";
import { CartItem } from "./cart";
import User from "./user";

interface Order extends Document {
  cartItems: CartItem[];
  totalPrice: number;
  paymentMethod: Payment;
  deliveredAt: Date | number;
  isDelivered: boolean;
  paidAt: Date | number;
  isPaid: boolean;
  taxPrice: number;
  address: string;
  user: User;
}

type Payment = 'cash' | 'card';

export default Order;