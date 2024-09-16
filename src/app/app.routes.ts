import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { authGuard, unAuthGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewUpdateComponent } from './review-update/review-update.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "products", title: 'All Products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
    { path: "products/:id", title: 'Product details', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
    {path: "login", canActivate: [unAuthGuard], component: LoginComponent},
    {path: "signup", canActivate: [unAuthGuard], component: SignupComponent},
    {path: "reviews", canActivate: [authGuard], component: ReviewsComponent},
    { path: "reviews/:id", canActivate: [authGuard], component: ReviewUpdateComponent },
    {path: "forgetPassword", canActivate: [unAuthGuard], component: ForgetPasswordComponent},
    {path: "wishlist", title: 'Wishlist', canActivate: [authGuard], loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent)},
    {path: "cart", canActivate: [authGuard], component: CartComponent},
    {path: "profile", canActivate: [authGuard], component: ProfileComponent},
    {path: "orders", canActivate: [authGuard], component: OrdersComponent},
    { path: '**', component: NotFoundComponent }
];
