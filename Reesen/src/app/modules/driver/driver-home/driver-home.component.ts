import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DriverHomeComponent {
  constructor(private webSocketService: WebSocketService, private snackBar: MatSnackBar) {
    this.webSocketService.onRideUpdate().subscribe(ride => {
      this.snackBar.open('New ride available', 'OK', { duration: 3000 });
    });
  }

}
