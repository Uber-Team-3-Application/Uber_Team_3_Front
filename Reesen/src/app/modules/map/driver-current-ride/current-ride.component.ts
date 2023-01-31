import {Component, OnInit, Input} from '@angular/core';
import {MapService} from "../../map/map.service";
import {VehicleService} from "../../driver/services/vehicle.service";
import {UserService} from "../../unregistered-user/user.service";
import {RideService} from "../../services/ride.service";
import {TokenDecoderService} from "../../auth/token/token-decoder.service";

import {Ride} from "../../../models/Ride";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-driver-current-ride',
  templateUrl: './current-ride.component.html',
  styleUrls: ['./current-ride.component.css']
})
export class CurrentRideComponent implements OnInit {

  @Input() ride : Ride;
  isOnlyMap = true;
  isCardLoaded  = false;
  mm = 0;
  ss = 0;
  ms = 0;
  isRunning = false;
  isNotePressed = false;
  timerId;
  rideEnded = false;
  @Input() role: string;
  @Input()id: number;
  isRideStarted  = false;
  isRideAccepted = false;

  panicForm = new FormGroup({
    inputNote: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
  });


  constructor(
              private router: Router,
              private vehicleService: VehicleService,
              private rideService: RideService) {

  }

  ngOnInit() {

      this.rideService.activeRideValue$.subscribe((value)=>{
        this.isCardLoaded = value;
      });
      this.rideService.rideEndedValue$.subscribe((value)=>{
        this.rideEnded = value;
      })

      this.rideService.isRideStarted$.subscribe((value) => {
        console.log("isRideStarted", this.isRideStarted);
        this.isRideAccepted = !value;
        this.isRideStarted = value;
        this.clickHandler();
      })



  }

  clickHandler() {

    if (this.isRideStarted) {
      // Stop => Running
      this.timerId = setInterval(() => {
        this.ms++;

        if (this.ms >= 100) {
          this.ss++;
          this.ms = 0;
        }
        if (this.ss >= 60) {
          this.mm++;
          this.ss = 0
        }
      }, 10);
    } else {
      clearInterval(this.timerId);
    }
    this.isRunning = !this.isRunning;
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }



  finishRide() {
    this.clickHandler();
    this.rideService.setRideEnded(true);
    this.rideService.endRide(this.ride.id).subscribe({
      next:(result) =>{
          if(this.role==='DRIVER')
            this.router.navigate(['/driverRideHistory']);
      },
      error:(error) =>{
          console.log(error);
      }
    });

  }
  sendPanic(){
    if(this.panicForm.valid){
      this.rideService.panicRide(this.ride.id, this.panicForm.value.inputNote)
          .subscribe({
            next:(result) =>{
              console.log(result);
              this.rideService.setPanicPressed(result);

            },
            error:(error) =>{
              console.log(error);
            }
          })

    }else{
      alert('Please enter a reason.');
    }

  }

  startRide() {
      this.isRideStarted = true;
      this.rideService.setRideStarted(true);
      this.clickHandler();
      this.rideService.startRide(this.ride.id).subscribe({
        
        next:(result) =>{
          this.vehicleService.simulateRide(result.id).subscribe({
            next:(ress) =>{
                
                this.isCardLoaded = true;
                this.clickHandler();
                console.log(ress);
            },
            error:(err) =>{
              console.log(err);
            }
          })
        },
        error:(error) =>{
            console.log(error);
        }
      });
  }
}
