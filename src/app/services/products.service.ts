import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  hostName: string;
  routePath: string;
  imgBaseUrl: string = "http://localhost:3000/products/"

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = _GlobalService.hostName;
    this.routePath = _GlobalService.productsRoute;
   }


  getProducts(limit: number = 12, page: number = 1, sort: string = '-createdAt', search: string = ''): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routePath}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getProductDetail(productId: string): Observable<any>{
    return this._HttpClient.get(`${this.hostName}${this.routePath}/${productId}`);
  }
}
