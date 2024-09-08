import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  hostName: string;
  routePath: string;
  productsRoute: string;
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = _GlobalService.hostName;
    this.routePath = _GlobalService.reviewsRoute;
    this.productsRoute = _GlobalService.productsRoute;
  }

  addReview(productId: string, formData: any): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.productsRoute}/${productId}/reviews`,
       formData,
       { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
  }

  getUserReviews(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routePath}?user=${userId}`, {headers : {authorization: `Bearer ${localStorage.getItem("token")}`}})
  }

  deleteReview(reviewId: string): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routePath}/${reviewId}`, {headers : {authorization: `Bearer ${localStorage.getItem("token")}`}})
  }

  getReview(reviewId: string): Observable<any>{
    return this._HttpClient.get(`${this.hostName}${this.routePath}/${reviewId}`, {headers : {authorization: `Bearer ${localStorage.getItem("token")}`}})
  }

  updateReview(reviewId: string, formData: any): Observable<any>{
    return this._HttpClient.patch(`${this.hostName}${this.routePath}/${reviewId}`, formData,{headers : {authorization: `Bearer ${localStorage.getItem("token")}`}})
  }

}
