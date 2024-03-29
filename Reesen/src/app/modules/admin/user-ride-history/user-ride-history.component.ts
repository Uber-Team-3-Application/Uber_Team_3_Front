import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ride, Review } from 'src/app/models/Ride';
import { ReviewService } from '../../services/review.service';
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
  hasLoaded = false;
  selectedSort = "Start Time";
  page = 1;
  selectedShowNumber = 2;
  totalEntries = 0;
  sortOrder = "Ascending";
  selectedSortOrder = "asc";

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private reviewService: ReviewService){}

  ngOnInit(): void {
    this.hasLoaded = false;
    this.getDataFromUrl();
    this.getTotalNumberOfRides();
    this.getRides(this.page, this.selectedShowNumber, 'timeOfStart');
  }

  private getRides(page: number, size: number, sortBy: string) {
    this.userService.getRides(this.userId, page - 1, size, sortBy + ',' + this.selectedSortOrder, null, null)
      .subscribe(
        {
          next: (result) => {
            this.rides = result.results;

            this.setRatings();
            this.hasLoaded = true;

          },
          error: (error) => {
            this.rides = [];
            console.log(error);
          }
        }
      );
  }

  private getTotalNumberOfRides() {
    this.userService.getTotalNumberOfRidesForUser(this.userId)
      .subscribe(
        {
          next: (result) => { this.totalEntries = result; },
          error: (error) => { console.log(error); }
        }
      );
  }

  private getDataFromUrl():void{
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = +id;
    this.userRole = this.route.snapshot.paramMap.get('role');
  }

  private setRatings(): void{
    this.ratings.length = 0;
    for(let i=0;i<this.rides.length;i++){
      this.reviewService.getAllReviewsForRide(this.rides[i].id).subscribe({
        next:(result) =>{

          const reviews: Review[] = result;
          if(!reviews || reviews.length === 0)
          {
            this.ratings[i] = 0;
            return;
          }
          const totalNumberOfReviews: number = reviews.length  * 2;
          let totalReviewScore = 0;
          for(let j =0;j<reviews.length;j++){
    
            const vehicleReview = reviews[j].vehicleReview;
            const driverReview = reviews[j].driverReview;
            totalReviewScore += vehicleReview.rating;
            totalReviewScore += driverReview.rating;
          }
    
          this.ratings.push(totalReviewScore/totalNumberOfReviews);

        },
        error:(error) =>{
          console.log(error);
        }
      })
      

    }
  }

  selectSort():void{
    if(this.selectedSort === 'Start Time') this.getRides(this.page, this.selectedShowNumber, 'timeOfStart');
    else if(this.selectedSort === 'End Time') this.getRides(this.page, this.selectedShowNumber, 'timeOfEnd');
    else if(this.selectedSort === 'Location Departure') this.getRides(this.page, this.selectedShowNumber, 'locations.departure.address');
    else if(this.selectedSort === 'Location Destination') this.getRides(this.page, this.selectedShowNumber, 'locations.destination.address');
  }
  selectPerPage(): void{
    this.selectSort();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.selectSort();
  }

  showRideInfo(ride: Ride): void{
    this.router.navigate(['users/' + this.userId + '/' + this.userRole + '/ride-history/' + ride.id]);
  }


  goBack():void{
    this.router.navigate(['users/' + this.userId + '/' + this.userRole]);
  }

  selectSortOrder():void{
    if(this.sortOrder === "Ascending") this.selectedSortOrder = "asc";
    else this.selectedSortOrder = "desc";
    this.selectSort();
  }

}
