import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { unAuthGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "products", component: ProductsComponent},
    { path: "products/:id", component: ProductDetailsComponent },
    {path: "login", canActivate: [unAuthGuard], component: LoginComponent},
    {path: "signup", canActivate: [unAuthGuard], component: SignupComponent},
];
