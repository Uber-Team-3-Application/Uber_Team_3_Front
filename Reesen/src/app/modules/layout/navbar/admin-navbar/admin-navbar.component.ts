import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class AdminNavbarComponent{
  constructor(private authService: AuthenticationService, private router: Router) {}


  logout(): void{
    this.authService.logout().subscribe({
      next: (result) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
        console.log(result);
      },
      error: (error) => {console.log(error);},
    });
  }
}
