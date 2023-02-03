import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import {DriverService} from "../../../driver/services/driver.service";
import {TokenDecoderService} from "../../../auth/token/token-decoder.service";
import { RideService } from 'src/app/modules/services/ride.service';

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class DriverNavbarComponent implements OnInit{
  active  = true;
  @Output() isSideBarActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  activeRide = false;

  constructor(private authService: AuthenticationService, 
    private router: Router, 
    private driverService : DriverService,
    private tokenService : TokenDecoderService,
    private rideService: RideService) {}

  ngOnInit(): void {
    const driverId = this.tokenService.getDecodedAccesToken().id;
    this.driverService.changeActivity(driverId, true).subscribe();
    this.driverService.createWorkingHours(driverId, new Date()).subscribe({
        next:(result) =>{
          localStorage.setItem("workingHourId", result.id.toString())
        },
        error:(error) =>{console.log(error);}
    });
    this.rideService.activeRideValue$.subscribe((value) => {
      this.activeRide = value;
    });
  }

  logout(): void{
 
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('workingHourId');
        this.authService.setUser();
        this.router.navigate(['login']);
      },
      error: (error) => {console.log(error);},
    });

  
  }

  changeSideBarActivity() {
    this.isSideBarActive.emit(false);
  }

  changeStatus() {
    this.active = !this.active;
    const driverId = this.tokenService.getDecodedAccesToken().id;
    this.driverService.changeActivity(driverId, this.active).subscribe();
    let workingHourId = +localStorage.getItem('workingHourId');
    if(!this.active){

      this.driverService.finishShift(workingHourId, new Date()).subscribe({
        next:(result) =>{
          console.log(result);

        },
        error:(error) =>{console.log(error);}
      });
    }else{
      this.driverService.createWorkingHours(driverId, new Date()).subscribe({
        next:(result) =>{
          console.log(result);

        },
        error:(error) =>{console.log(error);}
      })
    }
  }

}
