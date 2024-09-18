import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Product } from '../interfaces/products';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule, ToastModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService]
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: any;
  products: Product[] = [];
  productsImagesPath: string = '';
  pagination: Pagination = {};
  page: number = 1;
  searchQuery: string = '';
  constructor(private _ProductsService: ProductsService, private _MessageService: MessageService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(12, this.page, 'category subcategory name', this.searchQuery).subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }


  showMessage(message: string, severity: string){
    this._MessageService.add({
      severity: severity,
      detail: message,
      life: 1500,
    });
  }

  deleteProduct(productId: string) {
    this._ProductsService.deleteProduct(productId).subscribe({
      next: (res) => {
        this.loadProducts();
        this.showMessage('Product deleted', 'success');
      }, error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  search(query: string) {
    this.searchQuery = query;
    this.loadProducts()
  }


  clearSearch(searchInput: any){
    this.searchQuery = '';
    searchInput.value = '';
    this.loadProducts();
  }

  ngOnInit(): void {
    this.productsImagesPath = this._ProductsService.productsImagesPath;
    this.loadProducts();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
