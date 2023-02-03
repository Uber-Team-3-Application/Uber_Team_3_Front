import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { RideService } from 'src/app/modules/services/ride.service';

@Component({
  selector: 'app-passenger-navbar',
  templateUrl: './passenger-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class PassengerNavbarComponent implements OnInit{

  activeRide = false;
  constructor(private authService: AuthenticationService, 
    private router: Router,
    private rideService: RideService) {}


    ngOnInit(): void {
      this.rideService.activeRideValue$.subscribe((value)=>{
        this.activeRide = value;
      })
    }

  logout(): void{
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      },
      error: (error) => {console.log(error);},
    });
  }
}
