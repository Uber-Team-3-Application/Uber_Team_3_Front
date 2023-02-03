import { OnInit, Component } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { Driver } from 'src/app/models/Driver';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit{
    title:string;
    selectedView:string;
    firstName = "Pera";
    lastName = "Peric";
    driver:Driver;

    ngOnInit():void{
      this.selectedView = "ACCOUNT";
      this.title = "Account"

      this.setDriverName();
    }

    private setDriverName():void{
      const tokenInfo = this.tokenDecoder.getDecodedAccesToken();

      this.driverService.get(tokenInfo.id)
      .subscribe(
        (driver) => (this.driver = driver)
      );
    }



    constructor(private driverService:DriverService, private tokenDecoder: TokenDecoderService){

    }
    changeSelectedView(newView:string):void{
      this.selectedView = newView;
      if(newView==="ACCOUNT") this.title = "Account";
      else if(newView==="RIDE_HISTORY") this.title = "Ride History";
      else if(newView==="REPORTS") this.title = "Reports";
      else if (newView==='DOCUMENTS') this.title = "Documents"
      else this.title = "Inbox";

    }


}
