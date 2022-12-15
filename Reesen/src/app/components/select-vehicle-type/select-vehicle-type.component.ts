import { Component, OnInit } from '@angular/core';
import { VehicleType } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-select-vehicle-type',
  templateUrl: './select-vehicle-type.component.html',
  styleUrls: ['./select-vehicle-type.component.css']
})
export class SelectVehicleTypeComponent implements OnInit{

  vehicleTypes: VehicleType[];

  constructor(private vehicleService: VehicleService){}
  
  ngOnInit():void{
    this.vehicleService.getVehicleTypes()
                        .subscribe(
                          (vehicleTypes) => (this.vehicleTypes = vehicleTypes)
                        );
  }

}
