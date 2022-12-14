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
      if(newView==="ACCOUNT") this.title = "Account";
      else if(newView==="RIDE_HISTORY") this.title = "Ride History";
      else if(newView==="REPORTS") this.title = "Reports";
      else this.title = "Inbox";

    }


}
