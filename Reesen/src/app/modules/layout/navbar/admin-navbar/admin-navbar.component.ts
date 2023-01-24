import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import * as SockJS from 'sockjs-client';
import * as myStomp from 'stompjs';
import { TokenDecoderService } from 'src/app/modules/auth/token/token-decoder.service';
import { Ride } from 'src/app/models/Ride';
import { RideService } from 'src/app/modules/services/ride.service';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class AdminNavbarComponent implements OnInit{

  constructor(private authService: AuthenticationService, 
    private router: Router,
    private tokenDecoder: TokenDecoderService,
    private rideService: RideService) {}
  
  stompClient: any;
  socketEndpoint = 'http://localhost:8082/socket';
  id = 0;
  panicRide: Ride;

  initializeWebSocketConnection() {
    let ws = new SockJS(this.socketEndpoint);
    //this.stompClient = Stomp.Stomp.over(ws);
    
    this.stompClient = myStomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }
  openGlobalSocket(){
    console.log('admin socket');
    this.stompClient.subscribe('/topic/admin/panic/'+this.id, (message: {body: string}) =>{
      console.log(message);
      this.panicRide = JSON.parse(message.body);
      this.rideService.setPanicPressed(this.panicRide);
      this.router.navigate(['/panic-notification']);
    });
  }

  ngOnInit(): void {
    const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
    this.id = tokenInfo.id;
    this.initializeWebSocketConnection();
  }

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
