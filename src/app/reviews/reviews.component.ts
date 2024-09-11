import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';
import { AuthService } from '../services/auth.service';
import { Pagination } from '../interfaces/pagination';
import { ProductsService } from '../services/products.service';
import { Review } from '../interfaces/review';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {

  subscription: any;
  reviews: Review[] = [];
  pagination: Pagination = {};
  imagesBaseUrl: string;

  private _snackBar = inject(MatSnackBar);

  constructor(private _ReviewsService: ReviewsService, private _AuthService: AuthService, private _ProductService: ProductsService){
    this.imagesBaseUrl = _ProductService.imgBaseUrl;
  }

  loadReviews(){
    const currUser: any = this._AuthService.getCurrentUser().getValue();
    this.subscription = this._ReviewsService.getUserReviews(currUser?._id).subscribe(
      (res) => {
        this.reviews = res.data;
        this.pagination = res.pagination; 
      }
    )
  }

  deleteReview(reviewId: string){
    this.subscription = this._ReviewsService.deleteReview(reviewId).subscribe(
      (res) => {
        this.loadReviews();
        this.openSnackBar("Review Removed Successfully!");
      }
    )
  }

  changePage(pageNumber: number){
    const currUser: any = this._AuthService.getCurrentUser().getValue();
    this.subscription = this._ReviewsService.getUserReviews(currUser?._id, undefined, pageNumber).subscribe(
      (res) => {
        this.reviews = res.data;
        this.pagination = res.pagination; 
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Done', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }
  
  ngOnInit(): void {
    this.loadReviews();
  }
  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
