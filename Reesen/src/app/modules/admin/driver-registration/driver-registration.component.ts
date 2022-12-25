import {Component, Input, ViewChild} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DriverService } from "../../driver/services/driver.service";
import {Driver} from "../../../models/Driver";
import {Vehicle} from "../../../models/Vehicle";
import {VehicleService} from "../../driver/services/vehicle.service";

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.css']
})

export class DriverRegistrationComponent {
  currentState: boolean = true;
  driver: Driver;
  vehicle : Vehicle;


  constructor(private driveService: DriverService) {}

  changeState(event :boolean) {
    this.currentState = event;
  }

  setDriver($event: Driver) {
    this.driver = $event;
  }

  setVehicle($event : Vehicle) {
    this.vehicle = $event;
    this.registerDriverAndVehicle()
  }

  registerDriverAndVehicle() {
    this.driveService.saveDriver(this.driver).subscribe((res: any) => {
      console.log(res);
    });
    this.driveService.addVehicleToTheDriver(this.driver.id, this.vehicle).subscribe((res: any) => {
      console.log(res);
    });

  }

}
