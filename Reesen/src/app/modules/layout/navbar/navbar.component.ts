import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isShown: boolean = false;

  constructor() {
  }

  showSideBar() {
    this.isShown = ! this.isShown;
  }


}
