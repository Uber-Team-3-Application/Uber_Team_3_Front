import {Component, Input, ViewChild} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DriverService } from "../../driver/services/driver.service";

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.css']
})

export class DriverRegistrationComponent {
  currentState: boolean;

  changeState(event :boolean) {
    this.currentState = event;
  }

}
