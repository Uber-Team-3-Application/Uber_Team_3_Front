import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rate-ride',
  templateUrl: './rate-ride.component.html',
  styleUrls: ['./rate-ride.component.css']
})
export class RateRideComponent implements OnInit{

  rideId: number;
  id: number;
  reviewForm = new FormGroup({
    driverRating: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]),
    vehicleRating: new FormControl('', [Validators.required, Validators.email]),
    driverComment: new FormControl('', [Validators.required, Validators.minLength(5)]),
    vehicleComment: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private router: Router,
            private route: ActivatedRoute){}

  ngOnInit(): void {
    
  }

  leaveReview(): void{

  }
}
