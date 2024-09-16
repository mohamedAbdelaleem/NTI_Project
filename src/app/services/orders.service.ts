import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private hostName: string;
  private routePath: string;
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = _GlobalService.hostName;
    this.routePath = _GlobalService.ordersRoute;
   }


   placeOrder(address: string): Observable<any>{
    return this._HttpClient.post(`${this.hostName}${this.routePath}`,
       {address},
        {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}
      )
   }

   loadOrders(): Observable<any>{
    return this._HttpClient.get(`${this.hostName}${this.routePath}`,
        {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}}
      )
   }

}
