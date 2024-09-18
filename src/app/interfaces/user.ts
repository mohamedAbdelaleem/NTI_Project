


type Role = 'manager' | 'admin' | 'user';


export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    role: Role; 
    active: boolean;
    createdAt: string;
    updatedAt: string;
    wishlist: string[];
    passwordChangedAt?: string;
    image_url: string;
    id: string;
  }
  