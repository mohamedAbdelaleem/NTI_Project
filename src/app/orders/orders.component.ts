import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Order } from '../interfaces/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ToastModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [MessageService]
})
export class OrdersComponent implements OnInit, OnDestroy {
  subscription: any;
  orders: Order[] = [];
  productsImagesPath: string = '';
  pagination: any = {};
  page: number = 1;
  constructor(private _MessageService: MessageService, private _OrdersService: OrdersService, private _ProductsService: ProductsService) { }

  loadOrders() {
    this.subscription = this._OrdersService.getOrders(12, this.page, '-createdAt').subscribe({
      next: (res) => {
        this.orders = res.data;
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

  updateDelivered(orderId: string) {
    this._OrdersService.updateDeliveredOrder(orderId).subscribe({
      next: (res) => {
        this.loadOrders();
        this.showMessage('Order is delivered', "success")
      }, error: (err) => { }
    })
  }

  updatePaid(orderId: string) {
    this._OrdersService.updatePaidOrder(orderId).subscribe({
      next: (res) => {
        this.loadOrders();
        this.showMessage('Order is Paid', 'success');
      }, error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadOrders();
  }


  ngOnInit(): void {
    this.productsImagesPath = this._ProductsService.productsImagesPath;
    this.loadOrders();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}