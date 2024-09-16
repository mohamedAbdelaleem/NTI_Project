import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  hostName: string;
  routePath: string;
  imgBaseUrl: string = "http://localhost:3000/products/";
  categoriesRoute: string;

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = _GlobalService.hostName;
    this.routePath = _GlobalService.productsRoute;
    this.categoriesRoute = _GlobalService.categoriesRoute;
   }


  getProducts(
    limit: number = 12,
    page: number = 1,
    sort: string = '-createdAt',
    search: string = '',
    filters: {[key:string]: any} = {}): Observable<any> {

      let queryString: string = `limit=${limit}&page=${page}&sort=${sort}&search=${search}`;
      for (const key in filters) {
        if (filters.hasOwnProperty(key) && filters[key]) {
          queryString += `&${key}=${encodeURIComponent(filters[key])}`;
        }
      }
      return this._HttpClient.get(`${this.hostName}${this.routePath}?${queryString}`)
  }

  getProductDetail(productId: string): Observable<any>{
    return this._HttpClient.get(`${this.hostName}${this.routePath}/${productId}`);
  }

  loadCategories(): Observable<any>{
    return this._HttpClient.get(`${this.hostName}${this.categoriesRoute}`);
  }
}
