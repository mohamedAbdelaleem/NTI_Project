import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Login, Signup } from '../interfaces/auth';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hostName: string;
  routePath: string;
  currentUser = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router, private _Global: GlobalService) {
    this.hostName = _Global.hostName;
    this.routePath = _Global.authRoute;
  }

  saveCurrentUser(){
    const token: any = localStorage.getItem('token');
    this.currentUser.next(jwtDecode(token));
  }

  getCurrentUser() {
    const token: any = localStorage.getItem('token');
    if(token && this.currentUser.getValue() == null){
      this.saveCurrentUser();
    }
    return this.currentUser;
  }

  checkToken(){
    const token: any = localStorage.getItem('token');
    if (token){
      return true;
    }
    return false;
  }
  validateToken(){
    const token: any = localStorage.getItem('token');
    if(token){
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp! < (Date.now()/ 1000)){
        return false;
      }
      return true;
    }
    return false;
  }

  singUp(formData: Signup): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/api/v1/auth/signup', formData)
  }

  login(formData: Login): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/api/v1/auth/login', formData)
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this._Router.navigate(['/login']);
  }

  sendMail(formData: any): Observable<any>{
    return this._HttpClient.post(`${this.hostName}${this.routePath}/forgetPassword`, formData)
  }
  verifyCode(formData: any): Observable<any>{
    return this._HttpClient.post(`${this.hostName}${this.routePath}/verifyCode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } })
  }
  resetPassword(formData: any): Observable<any>{
    return this._HttpClient.put(`${this.hostName}${this.routePath}/resetCode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } })
  }
}
