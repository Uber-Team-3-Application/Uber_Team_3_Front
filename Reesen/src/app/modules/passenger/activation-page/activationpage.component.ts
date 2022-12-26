import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-activationpage',
  templateUrl: './activationpage.component.html',
  styleUrls: ['./activationpage.component.css']
})
export class ActivationpageComponent implements OnInit{
    email: string;
  
    constructor(private route: ActivatedRoute, private router: Router, private passengerService: PassengerService) {}
  
    ngOnInit() {
      this.email = this.route.snapshot.queryParams['email'];
      this.passengerService.activatePassenger(this.email);
    }
    goToLogin() {
      this.router.navigate(['/login']);
    }
}
