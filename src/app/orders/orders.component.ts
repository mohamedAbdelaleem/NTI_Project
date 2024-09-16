import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../interfaces/order';
import { OrdersService } from '../services/orders.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders?: Order[];
  subscription?: any;

  constructor(private _OrderService: OrdersService){}

  loadOrders(){
    this.subscription = this._OrderService.loadOrders().subscribe(
      (res) => {
        this.orders = res.data;
      }
    )
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
