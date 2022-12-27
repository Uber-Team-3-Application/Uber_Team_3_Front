import {Component} from "@angular/core";
import {DriverService} from "../../driver/services/driver.service";
import {Driver} from "../../../models/Driver";
import {Location} from "../../../models/Location";
import {Vehicle} from "../../../models/Vehicle";
import { Router } from "@angular/router";

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.css']
})

export class DriverRegistrationComponent {
  currentState: boolean = true;
  driver: Driver;
  vehicle : Vehicle;


  constructor(private driveService: DriverService,
            private router: Router) {}

  changeState(event :boolean) {
    this.currentState = event;
  }

  setDriver($event: Driver) {
    this.driver = $event;
  }

  setVehicle($event : Vehicle) {
    this.vehicle = $event;
    this.vehicle.currentLocation = {
      address: "Bulevar oslobodjenja 46",
      latitude: 45.267136,
      longitude: 19.833549
    };
    this.registerDriverAndVehicle()
  }w

  registerDriverAndVehicle() {
    this.driveService.saveDriver(this.driver).subscribe((res: Driver) => {
      console.log(res)
      this.driveService.addVehicleToTheDriver(res.id, this.vehicle).subscribe((res2: any) => {
        console.log(res2);
      });
    });
    alert("Succesfully registered a new driver!");

    this.router.navigate(['/'])

  }

}
