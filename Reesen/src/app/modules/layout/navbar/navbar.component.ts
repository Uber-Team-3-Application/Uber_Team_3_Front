import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';
import {DriverService} from "../../driver/services/driver.service";
import {TokenDecoderService} from "../../auth/token/token-decoder.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isShown: boolean = false;
  role: any;


  constructor(private authenticationService: AuthenticationService, private router: Router,
              private driverService : DriverService,  private tokenService : TokenDecoderService) {
  }


  logout(): void{
    if (this.role == 'DRIVER') {
      const driverId = this.tokenService.getDecodedAccesToken().id;
      this.driverService.changeActivity(driverId, false).subscribe();
    }
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    this.authenticationService.setUser();
    this.router.navigate(['/']);

  }

  ngOnInit(): void {
    this.authenticationService.userState$.subscribe((result) => {
      this.role = result;
    });
  }

  showSideBar() {
    this.isShown = ! this.isShown;
  }



}
