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
  selectedSort: string = "Start Time";
  page:number = 1;
  selectedShowNumber: number = 2;
  totalEntries: number = 0;
  sortOrder: string = "Ascending";
  selectedSortOrder: string = "asc";
  constructor(private userService: UserService, 
            private router: Router,
            private route: ActivatedRoute){}

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
            console.log(this.rides);
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
      let id = this.route.snapshot.paramMap.get('id');
      this.userId = +id;
      this.userRole = this.route.snapshot.paramMap.get('role');
  }

  private setRatings(): void{
    this.ratings.length = 0;
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
