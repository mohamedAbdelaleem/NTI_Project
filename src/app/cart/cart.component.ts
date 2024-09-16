import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/carts.service';
import { Cart } from '../interfaces/cart';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  subscription?: any;
  cart?: Cart;
  editMode: Map<string, boolean>= new Map();
  address: string = '';

  _snackBar = inject(MatSnackBar);

  constructor(
     private _CartService: CartService,
     private _OrdersService: OrdersService
    ){
  }

  loadCart(){
    this.subscription = this._CartService.getUserCart().subscribe(
      (res) => {
        this.cart = res.data;
        for(let cartItem of this.cart?.cartItems!){
          this.editMode.set(cartItem._id, false);
        }
      },
      (error) => {
        this.cart = undefined;
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

  placeOrder(event: any){
    event.preventDefault();
    console.log(this.address);

    this.subscription = this._OrdersService.placeOrder(this.address).subscribe(
      (res) =>  {
        this.loadCart();
        this.openSnackBar("Order Placed Successfully");
      }
    )
  }


  clearCart(){
    this.subscription = this._CartService.clearCart().subscribe(
      (res) => {
        this.cart = undefined;
        this.openSnackBar("Cart cleared successfully");
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
