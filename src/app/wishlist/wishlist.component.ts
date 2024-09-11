import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/carts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
  subscription?: any;
  wishlist: any[] = [];

  _snackBar = inject(MatSnackBar);

  constructor(private _WishlistService: WishlistService,
     private _CartService: CartService){
  }

  loadWishlist(){
    this.subscription = this._WishlistService.getUserWishList().subscribe(
      (res) => {
        this.wishlist = res.data;
      }
    )
  }

  addToCart(productId: string) {
    this.subscription = this._CartService.addProductToCart(productId).subscribe(
      (res) => {this.openSnackBar("Item add to Cart") }
    )
  }
  removeFromWishlist(productId: string) {
    this.subscription = this._WishlistService.removeFromWishlist(productId).subscribe(
      (res) =>  {
        this.loadWishlist();
        this.openSnackBar("Item removed from wishlist");
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Done', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.loadWishlist();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
