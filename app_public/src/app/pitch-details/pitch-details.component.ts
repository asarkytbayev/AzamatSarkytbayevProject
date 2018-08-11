import { Component, OnInit, Input } from '@angular/core';
import { Pitch, Review } from '../pitch';
import { PitchDataService } from '../pitch-data.service';

@Component({
  selector: 'app-pitch-details',
  templateUrl: './pitch-details.component.html',
  styleUrls: ['./pitch-details.component.css'],
  providers: [ PitchDataService ]
})
export class PitchDetailsComponent implements OnInit {

  /** takes in input of type Pitch (from details-page) */
  @Input() pitch: Pitch;

  /**
   * Injects dependencies
   * 
   * @param pitchDataService data service to retrieve pitch details
   */
  constructor(private pitchDataService: PitchDataService) { }

  /** keeps submitted review form data */
  public newReview: Review = {
    author: '',
    rating: 5,
    reviewText: ''
  };

  /** state of reviews */
  public reviewsVisible: boolean = false;

  /** state of review form */
  public formVisible: boolean = false;

  /** error message */
  public formError: string;

  /**
   * Validates the form
   * 
   * @return true if all form fields are filled,
   * false otherwise
   */
  private formIsValid(): boolean {
    if (this.newReview.author &&
        this.newReview.rating &&
        this.newReview.reviewText) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Hides data & resets the form
   */
  private resetAndHideReviewForm(): void {
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';
  }

  /**
   * Submits the form and saves the review
   */
  public onReviewSubmit(): void {
    this.formError = '';
    if (this.formIsValid()) {
      // console.log(this.newReview);
      this.pitchDataService
        .addReviewByPitchId(this.pitch._id, this.newReview)
        .then( (review: Review) => {
          // console.log('Review saved', review);
          this.pitch.reviews.unshift(review);
          this.resetAndHideReviewForm();
        });
    }
    else {
      this.formError = 'All fields required, please try again';
    }
  }


  ngOnInit(): void {
  }

}
