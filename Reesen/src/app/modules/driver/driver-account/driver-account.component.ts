import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { Vehicle } from 'src/app/models/Vehicle';
import { DriverService } from '../services/driver.service';
import { VehicleService } from 'src/app/modules/driver/services/vehicle.service';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';

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
      address: '',
      password: ''
    };

    vehicle: Vehicle = {
        model: '',
        vehicleType: '',
        licenseNumber:'',
        passengerSeats:4,
        babyTransport: false,
        petTransport:false
    }

    constructor(private driverService:DriverService, private vehicleService:VehicleService, private tokenDecoder: TokenDecoderService){

    }

    ngOnInit():void{
      const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
      this.driverService.get(tokenInfo.id).
      subscribe(
        (driver) =>(this.driver = driver)
        );

      this.vehicleService.get(tokenInfo.id)
      .subscribe(
        (vehicle) => (this.vehicle = vehicle)
      );
    }

}
