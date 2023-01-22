import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Ride } from './models/Ride';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: Socket;

  constructor() {
    this.socket = new Socket({ url: 'http://localhost:8082', options: {} });
  }

  sendRide(rideDto: Ride) {
    this.socket.emit('sendRide', rideDto);
  }

  onRideUpdate() {
    return this.socket.fromEvent<Ride>('rideUpdate');
  }
}