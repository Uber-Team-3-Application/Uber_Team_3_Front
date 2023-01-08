import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import {DriverService} from "../../../driver/services/driver.service";
import {TokenDecoderService} from "../../../auth/token/token-decoder.service";

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class DriverNavbarComponent implements OnInit{
  active  = true;
  @Output() isSideBarActive: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthenticationService, private router: Router, private driverService : DriverService,
              private tokenService : TokenDecoderService) {}

  ngOnInit(): void {
    const driverId = this.tokenService.getDecodedAccesToken().id;
    this.driverService.changeActivity(driverId, true).subscribe();
  }

  logout(): void{
    const driverId = this.tokenService.getDecodedAccesToken().id;
    this.driverService.changeActivity(driverId, false).subscribe();
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      },
      error: (error) => {console.log(error);},
    });
  }

  changeSideBarActivity() {
    this.isSideBarActive.emit(false);
  }

  changeStatus() {
    this.active = !this.active;
    const driverId = this.tokenService.getDecodedAccesToken().id;
    this.driverService.changeActivity(driverId, this.active).subscribe();
  }

}
