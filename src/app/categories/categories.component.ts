import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../interfaces/products';
import { Pagination } from '../interfaces/pagination';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, CommonModule, ToastModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscription: any;
  categories: Category[] = [];
  editMode: Map<string, boolean>= new Map();
  pagination?: Pagination;
  page: number = 1;
  searchQuery: string = '';
  constructor(
    private _CategoriesService: CategoriesService,
    private _MessageService: MessageService
  ) { }

  loadCategories() {
    this.subscription = this._CategoriesService.getCategories(12, this.page, '-createdAt', this.searchQuery).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.pagination = res.pagination;
        for(let category of this.categories){
          this.editMode.set(category._id, false);
        }
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

  deleteCategory(categoryId: string) {
    this._CategoriesService.deleteCategory(categoryId).subscribe({
      next: (res) => {
        this.loadCategories();
        this.showMessage("Category Deleted", "success")
      }, error: (err) => { }
    })
  }


  setEditMode(itemId: string){
    this.editMode.set(itemId, true);
  }

  setViewMode(itemId: string){
    this.editMode.set(itemId, false);
  }

  updateName(event: any, itemId: string){
    event.preventDefault();
    const inputElement = (event.target as HTMLElement).querySelector('input[name="name"]') as HTMLInputElement;
    const name = inputElement?.value;
    this.subscription = this._CategoriesService.updateCategory(itemId, {name}).subscribe(
      (res) =>  {
        this.loadCategories();
        this.showMessage("Category Updated Successfully", 'success');
        this.setViewMode(itemId);
      }
    )

  }

  search(query: string){
    this.searchQuery = query;
    this.loadCategories();
  }

  clearSearch(){
    this.searchQuery = '';
    this.loadCategories();
  }

  changePage(page: number) {
    this.page = page;
    this.loadCategories();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}