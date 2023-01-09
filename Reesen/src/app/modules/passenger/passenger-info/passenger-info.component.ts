import { Component } from '@angular/core';
import {User} from "../../../models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {PassengerService} from "../passenger.service";
import {DriverService} from "../../driver/services/driver.service";
import {UserService} from "../../unregistered-user/user.service";
import {Passenger} from "../../../models/Passenger";

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['../../admin/user-details/user-details.component.css']
})
export class PassengerInfoComponent {

  id: string;
  rideId : string;
  user: User;
  numId: number;

  constructor(private route: ActivatedRoute,
              private passengerService: PassengerService,
              private driverService: DriverService,
              private router: Router,
              private userService: UserService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rideId = this.route.snapshot.paramMap.get('rideId');
    this.numId = +this.id;
    this.getPassenger( this.numId);

  }


  private getPassenger(id: number) :void {
    this.passengerService.get(id)
      .subscribe(
        (passenger) => {this.user = passenger;console.log(this.user);
          this.userService.getUserIsBlocked(this.numId)
            .subscribe(
              (blocked) =>{ this.user.blocked = blocked; console.log(blocked);}
            )

        }
      );
  }

  goBack() {
    this.router.navigate(['driversRide/' + this.rideId]);
  }

}
