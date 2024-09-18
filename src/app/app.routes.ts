import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard, unAuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', title: 'login', canActivate:[unAuthGuard], component: LoginComponent },
  {
    path: 'categories', canActivate: [authGuard],
    children: [
      { path: '', title: 'All Categories', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent), },
      { path: 'create', title: 'create Category', loadComponent: () => import('./add-category/add-category.component').then(m => m.AddCategoryComponent) },
    ]
  },
  {
    path: 'subcategories', canActivate: [authGuard],
    children: [
      { path: '', title: 'All Subcategories', loadComponent: () => import('./subcategories/subcategories.component').then(m => m.SubcategoriesComponent) },
      { path: 'create', title: 'create Subcategory', loadComponent: () => import('./add-subcategory/add-subcategory.component').then(m => m.AddSubcategoryComponent) },
    ]
  },
  {
    path: 'products', canActivate: [authGuard],
    children: [
      { path: '', title: 'products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
      { path: 'create', title: 'create product', loadComponent: () => import('./add-product/add-product.component').then(m => m.AddProductComponent) },
    ]
  },


  {
    path: 'orders', canActivate: [authGuard],
    children: [
      { path: '', title: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
    ]
  },

  { path: 'profile', title: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'forgetPassword', title: 'forget password', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
  { path: '**', title: '404 Not Found', component: NotFoundComponent },
];
