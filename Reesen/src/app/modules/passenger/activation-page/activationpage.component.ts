import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerService } from '../passenger.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-activationpage',
  templateUrl: './activationpage.component.html',
  styleUrls: ['./activationpage.component.css']
})
export class ActivationpageComponent implements OnInit{
    token: string;
    decodedToken: {passengerId:number, expirationDate:Date}
    constructor(private route: ActivatedRoute, private router: Router, private passengerService: PassengerService) {}
  
    ngOnInit() {
      this.token = this.route.snapshot.queryParams['token'];
      this.decodedToken = jwt_decode(this.token);
      this.passengerService.activatePassengerAccount(this.decodedToken.passengerId).subscribe(
        (info) => {}
      );
    }
    goToLogin() {
      this.router.navigate(['/login']);
    }
}
