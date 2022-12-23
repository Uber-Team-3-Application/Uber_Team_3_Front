import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class AdminNavbarComponent implements OnInit{
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void{
    this.authService.logout().subscribe({
      next: (result) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      },
      error: (error) => {},
    });
  }
}
