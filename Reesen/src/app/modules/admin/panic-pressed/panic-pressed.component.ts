import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RideService } from '../../services/ride.service';
import { PanicService } from '../panic-page-admin/panic.service';

@Component({
  selector: 'app-panic-pressed',
  templateUrl: './panic-pressed.component.html',
  styleUrls: ['./panic-pressed.component.css']
})
export class PanicPressedComponent implements OnInit{

  ride = null;
  panicDTO = null;

  constructor(private rideService: RideService, private panicService: PanicService){}

  ngOnInit(): void {
    this.rideService.panicPressedValue$.subscribe((value) =>{
      this.ride = value;
      this.panicService.getByRideId(this.ride.id).subscribe({
        next: (result) =>{
          this.panicDTO = result;
        },
        error:(error) =>{
          console.log(error);
        }
      })
    });
  }


}
