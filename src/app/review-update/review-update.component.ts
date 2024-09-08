import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../interfaces/review';

@Component({
  selector: 'app-review-update',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './review-update.component.html',
  styleUrl: './review-update.component.scss'
})
export class ReviewUpdateComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  review?: Review;

  reviewForm: FormGroup = new FormGroup({
    content: new FormControl(null, [Validators.required]),
    rating: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
  })

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ReviewService: ReviewsService,
    private _Router: Router
  ) {}

  loadReview(){
    this.subscription = this._ReviewService.getReview(this.id).subscribe(
      (res) => {
        this.review = res.data;
      }
    )
  }

  updateProduct(){
    this.subscription = this._ReviewService.updateReview(this.id, this.reviewForm.value).subscribe(
      (res) => {
        this._Router.navigate(['/reviews']);
        
      }
    )
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.loadReview();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
