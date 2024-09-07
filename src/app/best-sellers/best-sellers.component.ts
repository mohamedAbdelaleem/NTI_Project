import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../interfaces/products';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss'
})
export class BestSellersComponent {
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
        console.log(this.pagination);
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
