export interface Category {
    _id: string;
    name: string;
}

export interface SubCategory {
    _id: string;
    name: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    sold: number;
    ratingAverage: number;
    ratingCount: number;
    cover: string;
    images: string[];
    category: Category;
    subcategory: SubCategory;
    createdAt: string;
    updatedAt: string;
    __v: number;
    reviews: any[]; // Adjust type if you have a specific review structure
    cover_url: string;
    id: string;
}
