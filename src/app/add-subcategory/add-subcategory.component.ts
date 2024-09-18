import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
  selector: 'app-add-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ToastModule],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.scss',
  providers: [MessageService]
})

export class AddSubcategoryComponent implements OnInit, OnDestroy {
  subscription: any;
  categories: any[] = [];
  subcategory: any = {};
  subcategoryError: string = '';
  subcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required])
  })
  constructor(private _SubcategoriesService: SubcategoriesService, private _CategoriesService: CategoriesService, private _Router: Router) { }

  getAllCategories() {
    this.subscription = this._CategoriesService.getCategories(200, undefined, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data
      }
    })
  }

  createSubcategory(formData: FormGroup) {
    this._SubcategoriesService.createSubcategory(formData.value).subscribe({
      next: (res) => {
        this._Router.navigate(['/subcategories'])
      },
      error: (err) => { this.subcategoryError = err.error.errors[0].msg }
    })
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}