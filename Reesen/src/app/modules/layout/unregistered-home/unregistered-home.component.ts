import { Component } from '@angular/core';

@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css']
})
export class UnregisteredHomeComponent {
  role = 'UNREGISTERED-USER';
}
