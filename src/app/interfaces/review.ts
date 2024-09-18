import { Category, SubCategory } from "./products";

interface User {
    _id: string;
    name: string;
    image: string;
    image_url: string;
    id: string;
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

export interface Review {
_id: string;
content: string;
rating: number;
user: User;
product: Product;
createdAt: string;
updatedAt: string;
}
