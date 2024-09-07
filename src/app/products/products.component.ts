import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/products';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products?: Product[];
  imgBaseUrl: string;
  pagination: Pagination = {};

  constructor(private _ProductsService: ProductsService){
    this.imgBaseUrl = _ProductsService.imgBaseUrl;
  }

  loadProducts(){
    this._ProductsService.getProducts(undefined, undefined, undefined, undefined).subscribe(
      (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      }
    )
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  changePage(page: number){
    this._ProductsService.getProducts(undefined, page, undefined, undefined).subscribe(
      (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      }
    )
  }

}
