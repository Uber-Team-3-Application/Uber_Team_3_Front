import { ChangeDetectorRef, OnInit, Component } from '@angular/core';
@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit{
    title:string;
    selectedView:string;

    ngOnInit():void{
      this.selectedView = "ACCOUNT";
      this.title = "Account"
    }

    changeSelectedView(newView:string):void{
      this.selectedView = newView;
      if(this.selectedView==="ACCOUNT") this.title = "Account";
      else if(this.selectedView==="FAVOURITE_ROUTES") this.title = "Favourite Routes";
      else if(this.selectedView==="RIDE_HISTORY") this.title = "Ride History";
      else if(this.selectedView==="REPORTS") this.title = "Reports";
      else this.title = "Inbox";

    }


}
