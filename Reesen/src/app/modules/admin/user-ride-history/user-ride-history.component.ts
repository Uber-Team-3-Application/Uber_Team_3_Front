import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ride } from 'src/app/models/Ride';
import { UserService } from '../../unregistered-user/user.service';

@Component({
  selector: 'app-user-ride-history',
  templateUrl: './user-ride-history.component.html',
  styleUrls: ['./user-ride-history.component.css']
})
export class UserRideHistoryComponent implements OnInit{

  userId: number;
  userRole:string;
  rides: Ride[];

  constructor(private userService: UserService, 
            private router: Router,
            private route: ActivatedRoute){}

  ngOnInit(): void {
     this.getDataFromUrl();

     this.userService.getRides(this.userId, 0, 5, 'timeOfStart', null, null)
          .subscribe(
          {
            next: (result) =>{
                this.rides = result.results;
                console.log(this.rides);
            },
            error: (error) =>{
              this.rides = [];
              console.log(error);
            }

          }
          );
  }

  private getDataFromUrl():void{
      let id = this.route.snapshot.paramMap.get('id');
      this.userId = +id;
      this.userRole = this.route.snapshot.paramMap.get('role');
  }

}
