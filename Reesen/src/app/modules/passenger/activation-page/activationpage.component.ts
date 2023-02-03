import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-activationpage',
  templateUrl: './activationpage.component.html',
  styleUrls: ['./activationpage.component.css']
})
export class ActivationpageComponent implements OnInit{
    url: string;
    constructor(private route: ActivatedRoute, private router: Router, private passengerService: PassengerService) {}
  
    ngOnInit() {
      this.url = this.route.snapshot.queryParams['url'];
      this.passengerService.activateAccount(this.url).subscribe(
        (info) => {console.log(info);}
      );
    }
    goToLogin() {
      this.router.navigate(['/login']);
    }
}
