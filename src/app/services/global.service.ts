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
  constructor() { }
}
