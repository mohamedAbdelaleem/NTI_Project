import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category, SubCategory } from '../interfaces/products';
import { Pagination } from '../interfaces/pagination';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SubcategoriesService } from '../services/subcategories.service';


@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [RouterLink, CommonModule, ToastModule],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss',
  providers: [MessageService]
})

export class SubcategoriesComponent implements OnInit, OnDestroy {
  subscription: any;
  subcategories: SubCategory[] = [];
  editMode: Map<string, boolean>= new Map();
  pagination?: Pagination;
  page: number = 1;
  searchQuery: string = '';
  constructor(
    private _SubCategoriesService: SubcategoriesService,
    private _MessageService: MessageService
  ) { }

  loadSubCategories() {
    this.subscription = this._SubCategoriesService.getSubcategories(12, this.page, '-createdAt', this.searchQuery).subscribe({
      next: (res) => {
        console.log(res);
        this.subcategories = res.data;
        this.pagination = res.pagination;
        for(let category of this.subcategories){
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
    this._SubCategoriesService.deleteSubcategory(categoryId).subscribe({
      next: (res) => {
        this.loadSubCategories();
        this.showMessage("SubCategory Deleted", "success")
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
    this.subscription = this._SubCategoriesService.updateSubcategory(itemId, {name}).subscribe(
      (res) =>  {
        this.loadSubCategories();
        this.showMessage("SubCategory Updated Successfully", 'success');
        this.setViewMode(itemId);
      }
    )

  }

  search(query: string){
    this.searchQuery = query;
    this.loadSubCategories();
  }

  clearSearch(searchInput: any){
    this.searchQuery = '';
    searchInput.value = '';
    this.loadSubCategories();
  }

  changePage(page: number) {
    this.page = page;
    this.loadSubCategories();
  }

  ngOnInit(): void {
    this.loadSubCategories();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}