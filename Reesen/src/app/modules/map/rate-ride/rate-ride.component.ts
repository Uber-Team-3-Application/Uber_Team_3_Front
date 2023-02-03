import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-rate-ride',
  templateUrl: './rate-ride.component.html',
  styleUrls: ['./rate-ride.component.css']
})
export class RateRideComponent implements OnInit{

  rideId: number;
  reviewForm = new FormGroup({
    driverRating: new FormControl('', ),
    vehicleRating: new FormControl('', ),
    driverComment: new FormControl('', [Validators.required, Validators.minLength(2)]),
    vehicleComment: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });
  rateVehicle = 3;
  rateDriver = 0;
  hasError = false;

  constructor(private router: Router,
            private route: ActivatedRoute,
            private reviewService: ReviewService){}

  ngOnInit(): void {
    this.rideId = +this.route.snapshot.paramMap.get('rideId');
  }

  leaveReview(): void{
    if(this.reviewForm.valid){
      this.hasError = false;
      const driverRating = +this.reviewForm.value.driverRating;
      const vehicleRating = +this.reviewForm.value.vehicleRating;
      const driverComment = this.reviewForm.value.driverComment;
      const vehicleComment = this.reviewForm.value.vehicleComment;
      this.reviewService.leaveReviewForDriver(this.rideId, driverRating, driverComment).subscribe({
        next:(result) =>{
          console.log(result);
          this.reviewService.leaveReviewForVehicle(this.rideId, vehicleRating, vehicleComment).subscribe({
            next:(res) =>{
                alert('Review successfully left!');
                this.goHome();
            },
            error:(err)=>{
              console.log(err);
            }
          })
        },
        error:(error) =>{
            console.log(error);
        }
      });

    }else{
      this.hasError = true;
    }
  }
  goHome(): void{
    this.router.navigate(['/passenger_ride-history']);
  }
}
