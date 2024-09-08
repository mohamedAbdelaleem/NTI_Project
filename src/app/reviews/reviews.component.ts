import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';
import { AuthService } from '../services/auth.service';
import { Pagination } from '../interfaces/pagination';
import { ProductsService } from '../services/products.service';
import { Review } from '../interfaces/review';

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
  pagination?: Pagination;
  imagesBaseUrl: string;

  constructor(private _ReviewsService: ReviewsService, private _AuthService: AuthService, private _ProductService: ProductsService){
    this.imagesBaseUrl = _ProductService.imgBaseUrl;
  }

  loadReviews(){
    const currUser: any = this._AuthService.getCurrentUser().getValue();
    console.log(currUser?._id);
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
        alert("Review deleted successfully!"); 
      }
    )
  }

  ngOnInit(): void {
    this.loadReviews();
  }
  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
