import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ride, Review, SingleReview } from 'src/app/models/Ride';
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
  ratings = new Array();
  hasLoaded: boolean = false;
  constructor(private userService: UserService, 
            private router: Router,
            private route: ActivatedRoute){}

  ngOnInit(): void {
     this.hasLoaded = false;
     this.getDataFromUrl();
     this.userService.getRides(this.userId, 0, 5, 'timeOfStart', null, null)
          .subscribe(
          {
            next: (result) =>{
                this.rides = result.results;
                console.log(this.rides);
                this.setRatings();
                this.hasLoaded = true;
                
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

  private setRatings(): void{
    for(let i=0;i<this.rides.length;i++){
        let reviews: Review[] = this.rides[i].reviews;
        if(reviews.length === 0) 
        {
          this.ratings[i] = 0; 
          continue;

        }
        let totalNumberOfReviews: number = reviews.length  * 2;
        let totalReviewScore: number = 0;
        for(let j =0;j<reviews.length;j++){

          let vehicleReview = reviews[j].vehicleReview;
          let driverReview = reviews[j].driverReview; 
          totalReviewScore += vehicleReview.rating;
          totalReviewScore += driverReview.rating;
        }
      
        this.ratings.push(totalReviewScore/totalNumberOfReviews);

    }
  }

  showRideInfo(ride: Ride): void{
    
  }

}
