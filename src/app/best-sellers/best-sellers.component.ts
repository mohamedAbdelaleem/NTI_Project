import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../interfaces/products';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { Pagination } from '../interfaces/pagination';
import { CartService } from '../services/carts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  _snackBar = inject(MatSnackBar);

  constructor(private _ProductsService: ProductsService, private _CartService: CartService){
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

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Done', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe(
      (res) => {this.openSnackBar("Product added to Shopping Cart!") }
    )
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
