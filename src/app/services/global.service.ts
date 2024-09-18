import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  hostName: string = "http://localhost:3000/";
  authRoute: string =  "api/v1/auth";
  productsRoute: string =  "api/v1/products";
  cartsRoute: string =  "api/v1/carts";
  wishlistRoute: string =  "api/v1/wishlist";
  reviewsRoute: string =  "api/v1/reviews";
  usersRoute: string =  "api/v1/users";
  ordersRoute: string =  "api/v1/orders";
  categoriesRoute: string =  "api/v1/categories";
  subcategoriesRoute: string =  "api/v1/subcategories";
  productsImagesPath: string = "products/"
  constructor() { }
}
