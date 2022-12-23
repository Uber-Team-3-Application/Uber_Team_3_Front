import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isShown: boolean = false;
  role: any;


  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }


  logout(): void{
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
