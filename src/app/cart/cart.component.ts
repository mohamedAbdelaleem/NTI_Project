import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/carts.service';
import { Cart } from '../interfaces/cart';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  subscription?: any;
  cart?: Cart;
  editMode: Map<string, boolean>= new Map();

  _snackBar = inject(MatSnackBar);

  constructor(
     private _CartService: CartService){
  }

  loadCart(){
    this.subscription = this._CartService.getUserCart().subscribe(
      (res) => {
        this.cart = res.data;
        for(let cartItem of this.cart?.cartItems!){
          this.editMode.set(cartItem._id, false);
        }
      }
    )
  }

  
  removeFromCart(itemId: string) {
    this.subscription = this._CartService.removeCartItem(itemId).subscribe(
      (res) =>  {
        this.loadCart();
        this.editMode.delete(itemId);
        this.openSnackBar("Item removed from Cart");
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Done', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }

  setEditMode(itemId: string){
    this.editMode.set(itemId, true);
  }

  setViewMode(itemId: string){
    this.editMode.set(itemId, false);
  }

  updateQuantity(event: any, itemId: string){
    event.preventDefault();
    console.log(event);
    const inputElement = (event.target as HTMLElement).querySelector('input[name="quantity"]') as HTMLInputElement;
    const quantity = inputElement?.value;
    this.subscription = this._CartService.updateQuantity(itemId, parseInt(quantity)).subscribe(
      (res) =>  {
        this.loadCart();
        this.setViewMode(itemId);
        this.openSnackBar("Quantity Updated");
      }
    )

  }

  ngOnInit(): void {
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
