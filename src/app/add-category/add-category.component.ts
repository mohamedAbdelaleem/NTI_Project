import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ToastModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
  providers: [MessageService]
})
export class AddCategoryComponent{
  categoryError: string = '';
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  })
  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router,
    private _MessageService: MessageService
  ) { }

  showMessage(message: string, severity: string){
    this._MessageService.add({
      severity: severity,
      detail: message,
      life: 1000,
    });
  }

  createCategory(formData: FormGroup) {
    this._CategoriesService.createCategory(formData.value).subscribe({
      next: (res) => {
        this.showMessage("Category Added Successfully", 'success');
        this._Router.navigate(['/categories'])
      },
      error: (err) => { this.categoryError = err.error.errors[0].msg }
    })
  }

}