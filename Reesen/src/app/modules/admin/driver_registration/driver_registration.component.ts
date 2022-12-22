import {Component, Input, ViewChild} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DriverService } from "../../driver/services/driver.service";
import {flush} from "@angular/core/testing";

@Component({
  selector: 'app-driver_registration',
  templateUrl: './driver_registration.component.html',
  styleUrls: ['./driver_registration.component.css']
})

export class DriverRegistrationComponent {
  currentState: boolean = true;

  changeState(event :boolean) {
    this.currentState = event;
  }

}
