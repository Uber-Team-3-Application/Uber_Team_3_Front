import { ChangeDetectorRef, OnInit, Component } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { Driver } from 'src/app/models/Driver';
@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit{
    title:string;
    selectedView:string;
    firstName: String = "Pera";
    lastName: String = "Peric";
    driver:Driver;

    ngOnInit():void{
      this.selectedView = "ACCOUNT";
      this.title = "Account"

      this.setDriverName();
    }

    private setDriverName():void{
      this.driverService.get(2)
      .subscribe(
        (driver) => (this.driver = driver)
      );
    }

    constructor(private driverService:DriverService){

    }
    changeSelectedView(newView:string):void{
      this.selectedView = newView;
      if(newView==="ACCOUNT") this.title = "Account";
      else if(newView==="RIDE_HISTORY") this.title = "Ride History";
      else if(newView==="REPORTS") this.title = "Reports";
      else this.title = "Inbox";

    }


}
