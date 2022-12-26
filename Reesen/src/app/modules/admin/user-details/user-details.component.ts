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
  constructor(private route: ActivatedRoute, 
    private passengerService: PassengerService,
    private driverService: DriverService,
    private router: Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.role = this.route.snapshot.paramMap.get('role');
    let numId: number = +this.id;
    if(this.role === 'DRIVER'){
      this.getDriver(numId);
    }else this.getPassenger(numId);

  }

  getDriver(id:number): void{
    this.driverService.get(id)
        .subscribe(
          (driver) => {this.user = driver; 
            console.log(this.user);
          }
        );
  }

  getPassenger(id:number): void{
    this.passengerService.get(id)
        .subscribe(
          (passenger) => {this.user = passenger;console.log(this.user)}
        );
  }


  editUserProfile():void{ 
    this.router.navigate(['users/' + this.id + '/' + this.role + '/edit'])
  }

}
