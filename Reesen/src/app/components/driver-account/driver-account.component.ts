import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-account',
  templateUrl: './driver-account.component.html',
  styleUrls: ['./driver-account.component.css']
})
export class DriverAccountComponent implements OnInit{
    driver:Driver = {
      name: '',
      surname: '',
      profilePicture: '',
      telephoneNumber: '',
      email: '',
      address: ''
    };

    constructor(private driverService:DriverService){

    }

    ngOnInit():void{
      this.driverService.get(2).
      subscribe(
        (driver) =>(this.driver = driver)
        );
    }

}
