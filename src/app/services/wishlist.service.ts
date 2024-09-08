import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private hostName: string;
  private routePath: string;
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = _GlobalService.hostName;
    this.routePath = _GlobalService.wishlistRoute;
   }

  addProductToWishlist(product: string): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routePath}`, { product }, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
}
