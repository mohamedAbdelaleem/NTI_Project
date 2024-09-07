import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/carts.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgBaseUrl: string = '';
  product: any = {};
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) { }
  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.imgBaseUrl = this._ProductsService.imgBaseUrl;
    this.subscription = this._ProductsService.getProductDetail(this.id).subscribe((res) => {
      this.product = res.data
    })
  }

  addToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe((res) => { alert('Product Added to wishlist') })
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe((res) => {alert('Product Added to cart') })
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
