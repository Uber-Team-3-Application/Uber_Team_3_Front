import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-panic-pressed',
  templateUrl: './panic-pressed.component.html',
  styleUrls: ['./panic-pressed.component.css']
})
export class PanicPressedComponent implements OnInit{

  ride = null;
  panicDTO = null;

  constructor(private rideService: RideService){}

  ngOnInit(): void {
    this.rideService.panicPressedValue$.subscribe((value) =>{
      this.ride = value;
      
    });
  }


}
