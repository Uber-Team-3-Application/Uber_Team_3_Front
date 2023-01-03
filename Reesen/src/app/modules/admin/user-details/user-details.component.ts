import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { DriverService } from '../../driver/services/driver.service';
import { PassengerService } from '../../passenger/passenger.service';
import { UserService } from '../../unregistered-user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  id: string;
  role: string;
  user: User;
  numId: number;
  hasLoaded: boolean = false;
  constructor(private route: ActivatedRoute, 
    private passengerService: PassengerService,
    private driverService: DriverService,
    private router: Router,
    private userService: UserService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.role = this.route.snapshot.paramMap.get('role');
    this.numId = +this.id;
    if(this.role === 'DRIVER'){
      this.getDriver(this.numId);
    }else this.getPassenger( this.numId);

  }

  getDriver(id:number): void{
    this.driverService.get(id)
        .subscribe(
          (driver) => {this.user = driver; 
            console.log(this.user);

            this.userService.getUserIsBlocked(this.numId)
                .subscribe(
                (blocked) =>{ this.user.blocked = blocked; console.log(blocked); this.hasLoaded = true;}
                )
          }
        );
  }

  getPassenger(id:number): void{
    this.passengerService.get(id)
        .subscribe(
          (passenger) => {this.user = passenger;console.log(this.user);
            this.userService.getUserIsBlocked(this.numId)
                .subscribe(
                (blocked) =>{ this.user.blocked = blocked; console.log(blocked); this.hasLoaded = true;}
                )
          
          }
        );
  }

  showUserRideHistory():void{
    this.router.navigate(['users/' + this.id + '/' + this.role + '/ride-history'])
  }

  editUserProfile():void{ 
    this.router.navigate(['users/' + this.id + '/' + this.role + '/edit']);
  }

  editVehicleInfo():void{
    this.router.navigate(['users/' + this.id  + '/' + this.role + '/edit-vehicle']);
     
  }

  goBack():void{
    this.router.navigate(['users/']);
  }
}
