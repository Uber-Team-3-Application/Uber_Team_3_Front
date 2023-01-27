import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rate-ride',
  templateUrl: './rate-ride.component.html',
  styleUrls: ['./rate-ride.component.css']
})
export class RateRideComponent implements OnInit{

  rideId: number;
  id: number;

  constructor(private router: Router,
            private route: ActivatedRoute){}

  ngOnInit(): void {
    
  }

}
