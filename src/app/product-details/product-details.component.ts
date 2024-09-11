import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CartService } from '../services/carts.service';
import { WishlistService } from '../services/wishlist.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ReactiveFormsModule, DatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgBaseUrl: string = '';
  product: any = {};
  reviewError: string = '';
  isAuthenticated: boolean = false;

  reviewForm: FormGroup = new FormGroup({
    content: new FormControl(null, [Validators.required]),
    rating: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
  })

  private _snackBar = inject(MatSnackBar);

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _ReviewService: ReviewsService,
    private _AuthService: AuthService,
  ) { 
    if(this._AuthService.getCurrentUser().getValue() != null){
      this.isAuthenticated = true;
    }
    else{
      this.isAuthenticated = false;
    }
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.imgBaseUrl = this._ProductsService.imgBaseUrl;
    this.loadProduct();
  }

  loadProduct(){
    this.subscription = this._ProductsService.getProductDetail(this.id).subscribe((res) => {
      this.product = res.data
    })
  }

  addToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe(
      (res) => { this.openSnackBar("Product added to wishlist!") }
    )
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe(
      (res) => {this.openSnackBar("Product added to Shopping Cart!") }
    )
  }

  addReview(productId: string){
    this._ReviewService.addReview(productId, this.reviewForm.value).subscribe(
      (res) => {
        this.reviewForm.reset();
        this.loadProduct();
      },
      (err) => {
        console.log(err);
        if(err.error.errors){
          this.reviewError = err.error.errors[0].msg;
        }
      }
    )
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Done', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
