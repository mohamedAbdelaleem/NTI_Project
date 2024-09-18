import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private hostName: string = '';
  private routePath: string = '';
  productsImagesPath: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routePath = this._GlobalService.productsRoute;
    this.productsImagesPath = this._GlobalService.productsImagesPath;
  }

  getAllProducts(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routePath}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getProduct(productId: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routePath}/${productId}`);
  }

  createProduct(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routePath}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  updateProduct(productId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.hostName}${this.routePath}/${productId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  deleteProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routePath}/${productId}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
}
