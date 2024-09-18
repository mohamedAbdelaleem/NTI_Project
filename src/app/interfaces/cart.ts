import { Category, SubCategory } from "./products";

export interface Cart {
    _id: string;
    cartItems: CartItem[];
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalPrice: number;
  }
  

interface Product {
_id: string;
name: string;
cover: string;
cover_url: string;
category: Category;
subcategory: SubCategory;
id: string;
}
export interface CartItem {
product: Product;
quantity: number;
unit_price: number;
_id: string;
}