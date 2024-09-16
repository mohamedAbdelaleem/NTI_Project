import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Category, Product } from '../interfaces/products';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Pagination } from '../interfaces/pagination';
import { CartService } from '../services/carts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products?: Product[];
  categories?: Category[];
  imgBaseUrl: string;
  pagination: Pagination = {};
  _snackBar = inject(MatSnackBar);
  searchQuery?: string;
  filteredCategory?: string;

  constructor(private _ProductsService: ProductsService, private _CartService: CartService){
    this.imgBaseUrl = _ProductsService.imgBaseUrl;
  }

  loadProducts(){
    this._ProductsService.getProducts(
      undefined, undefined, undefined,
      this.searchQuery, {category: this.filteredCategory}).subscribe(
      (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      }
    )
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
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

  search(){
    console.log(this.searchQuery);
    this.loadProducts();
    
  }

  filter(categoryId: string){
    this.filteredCategory = categoryId;
    this.loadProducts();
  }

  clearSearch(){
    this.searchQuery = undefined;
    this.loadProducts();
  }

  clearFilter(){
    this.filteredCategory = undefined;
    this.loadProducts();
  }

  
  loadCategories(){
    this._ProductsService.loadCategories().subscribe(
      (res) => {
        this.categories = res.data;
      }
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
