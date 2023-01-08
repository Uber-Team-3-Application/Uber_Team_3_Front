import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';

@Component({
  selector: 'app-passenger-navbar',
  templateUrl: './passenger-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class PassengerNavbarComponent {

  constructor(private authService: AuthenticationService, private router: Router) {}


  logout(): void{
    this.authService.logout().subscribe({
      next: (result) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      },
      error: (error) => {console.log(error);},
    });
  }
}
