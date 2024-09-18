import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private hostName: string = '';
  private routePath: string = '';
  private categoriesRoute: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routePath = this._GlobalService.subcategoriesRoute;
    this.categoriesRoute = this._GlobalService.categoriesRoute;
  }

  getSpecificSubcategories(categoryId: string, limit: number = 30, sort: string = 'name'): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routePath}?limit=${limit}&sort=${sort}&category=${categoryId}`)
  }

  getSubcategories(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routePath}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routePath}/${subcategoryId}`)
  }

  createSubcategory(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routePath}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  updateSubcategory(subcategoryId: string, formData: any): Observable<any> {
    return this._HttpClient.patch(`${this.hostName}${this.routePath}/${subcategoryId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  deleteSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routePath}/${subcategoryId}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
}
