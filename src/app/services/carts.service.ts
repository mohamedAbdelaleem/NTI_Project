import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private hostName: string;
  private routePath: string;
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = _GlobalService.hostName;
    this.routePath = _GlobalService.cartsRoute;
   }

  addProductToCart(product: string): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routePath}`, { product }, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routePath}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  removeCartItem(itemId: string){
    return this._HttpClient.delete(`${this.hostName}${this.routePath}/${itemId}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }


  updateQuantity(itemId: string, quantity: number){
    return this._HttpClient.put(`${this.hostName}${this.routePath}/${itemId}`, {quantity}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  

}
