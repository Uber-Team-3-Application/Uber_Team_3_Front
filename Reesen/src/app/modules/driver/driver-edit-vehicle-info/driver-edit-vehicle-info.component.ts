import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle, VehicleType } from 'src/app/models/Vehicle';
import { DriverService } from '../services/driver.service';
import { VehicleService } from 'src/app/modules/driver/services/vehicle.service';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';

@Component({
  selector: 'app-driver-edit-vehicle-info',
  templateUrl: './driver-edit-vehicle-info.component.html',
  styleUrls: ['./driver-edit-vehicle-info.component.css']
})
export class DriverEditVehicleInfoComponent implements OnInit{

  editVehicleForm = new FormGroup({
    model:new FormControl('', [Validators.required, Validators.minLength(5)]),
    type: new FormControl('STANDARD', []),
    registration: new FormControl('',[ Validators.required, Validators.minLength(7), Validators.maxLength(9)]),
    numberOfSeats: new FormControl('2', []),
    babyTransport: new FormControl(false, []),
    petTransport: new FormControl(false, [])
  });
  vehicle: Vehicle;
  hasError: boolean = false;

  constructor(private driverService: DriverService, 
    private router: Router, 
    private tokenDecoder: TokenDecoderService,
    private vehicleService: VehicleService){

  }
  ngOnInit(): void {
    const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
    this.driverService.getDriversVehicle(tokenInfo.id)
    .subscribe(
      (vehicle) => {this.vehicle = vehicle}
    );
  }


    editVehicle():void{
        if(this.editVehicleForm.valid){
            this.hasError = false;
            const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
            this.vehicleService.edit(this.vehicle, tokenInfo.id)
                .subscribe(
                  (res) => {console.log(res);}
                );
            alert("Vehicle edited successfully!");
            this.navigateBack();
        }else{
          this.hasError = true;
        }
    }


    navigateBack():void{
        this.router.navigateByUrl("/driverProfile");
    }
}
