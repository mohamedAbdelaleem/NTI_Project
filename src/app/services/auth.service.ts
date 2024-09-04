import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Login, Signup } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient) {}

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

  singUp(formData: Signup): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/api/v1/auth/signup', formData)
  }

  login(formData: Login): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/api/v1/auth/login', formData)
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
  }
}
