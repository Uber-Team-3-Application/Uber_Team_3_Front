import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { Vehicle } from 'src/app/models/Vehicle';
import { DriverService } from 'src/app/services/driver/driver.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

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
    
    vehicle: Vehicle = {
        model: '',
        vehicleType: '',
        licenseNumber:'',
        passengerSeats:4,
        babyTransport: false,
        petTransport:false
    }

    constructor(private driverService:DriverService, private vehicleService:VehicleService){

    }

    ngOnInit():void{
      this.driverService.get(2).
      subscribe(
        (driver) =>(this.driver = driver)
        );

      this.vehicleService.get(2)
      .subscribe(
        (vehicle) => (this.vehicle = vehicle)
      );
    }

}
