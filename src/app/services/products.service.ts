import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  imgBaseUrl: string = "http://localhost:3000/products/"

  constructor(private _HttpClient: HttpClient) { }


  getProducts(limit: number = 12, page: number = 1, sort: string = '-createdAt', search: string = ''): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/products?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getProductDetail(productId: string): Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/api/v1/products/${productId}`);
  }
}
