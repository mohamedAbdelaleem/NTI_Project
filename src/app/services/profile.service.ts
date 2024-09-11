import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  hostname: string;
  routePath: string;
  constructor(private _HttpClient: HttpClient, private _Global: GlobalService) {
    this.hostname = _Global.hostName;
    this.routePath = _Global.usersRoute;
  }


  loadCurrentUserData(): Observable<any>{
    return this._HttpClient.get(`${this.hostname}${this.routePath}/me`,
       {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}}
    )
  }

  updateCurrentUser(formData: any): Observable<any>{
    return this._HttpClient.put(`${this.hostname}${this.routePath}/me`, formData,
      {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}}
   )
  }

  changePassword(formData: any): Observable<any>{
    return this._HttpClient.put(`${this.hostname}${this.routePath}/changePassword`, formData,
      {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}}
   )

  }

}
