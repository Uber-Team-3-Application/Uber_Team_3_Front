import { Component } from '@angular/core';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
import {Observable} from 'rxjs';
import { timer } from 'rxjs';

import { RideService } from '../../services/ride.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  id = 0;
  role = '';
  decodedToken = null;
  constructor(private tokenDecoder: TokenDecoderService) {
    const tokenObservable = new Observable(subscriber => {
      subscriber.next(this.tokenDecoder.getDecodedAccesToken());

      window.addEventListener('storage', (event) => {
        subscriber.next(this.tokenDecoder.getDecodedAccesToken());
      });
    });

    tokenObservable.subscribe(token => {
      if (token !== null) {
        this.decodedToken = token;
        this.id = +this.decodedToken.id;

        this.role = this.decodedToken.role[0]['authority'];
      } else {
        this.id = 0;
        this.role = '';
        console.log('LOGOUT');
      }
    });

  }
}
