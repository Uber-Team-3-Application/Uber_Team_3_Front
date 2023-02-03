import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {MapService} from "../../map/map.service";
import {VehicleService} from "../../driver/services/vehicle.service";
import {UserService} from "../../unregistered-user/user.service";
import {RideService} from "../../services/ride.service";
import {TokenDecoderService} from "../../auth/token/token-decoder.service";

import {Ride} from "../../../models/Ride";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {timer} from "rxjs";

@Component({
  selector: 'app-driver-current-ride',
  templateUrl: './current-ride.component.html',
  styleUrls: ['./current-ride.component.css']
})
export class CurrentRideComponent implements OnInit, AfterViewInit {

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
  isHtmlLoaded = false;


  displayTimer;
  time;

  panicForm = new FormGroup({
    inputNote: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
  });


  constructor(
              private router: Router,
              private vehicleService: VehicleService,
              private rideService: RideService) {
    this.time = 0;
  }

  ngOnInit() {

      this.rideService.activeRideValue$.subscribe((value)=>{
        this.isCardLoaded = value;
      });
      this.rideService.rideEndedValue$.subscribe((value)=>{
        this.rideEnded = value;
      })
    this.rideService.isRideStarted$.subscribe((value) => {
      this.isRideAccepted = !value;
      this.isRideStarted = value;
      if (!this.isRunning && this.isHtmlLoaded)
        this.toggleTimer();

    })
    this.isRideStarted = false;
  }

  ngAfterViewInit() {
    this.isHtmlLoaded = true;
  }


  toggleTimer() {
    this.isRunning = !this.isRunning;
    this.stopwatch();
  }

  stopwatch() {
    timer(0, 1000).subscribe(() => {
      if (this.isRunning) {
        this.time++;
        this.getDisplayTimer(this.time);
      }
    });
  }

  getDisplayTimer(time: number) {
    let hours = '' + Math.floor(time / 3600);
    let minutes = '' + Math.floor(time % 3600 / 60);
    let seconds = '' + Math.floor(time % 3600 % 60);


    if (Number(hours) < 10) {
      hours = '0' + hours;
    } else {
      hours = '' + hours;
    }
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    } else {
      minutes = '' + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    } else {
      seconds = '' + seconds;
    }

    this.displayTimer = hours + ':' + minutes + ':' + seconds;

  }


  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }



  finishRide() {
    this.toggleTimer();
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
      this.rideService.startRide(this.ride.id).subscribe({

        next:(result) =>{
          this.vehicleService.simulateRide(result.id).subscribe({
            next:(ress) =>{
                this.isCardLoaded = true;
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
