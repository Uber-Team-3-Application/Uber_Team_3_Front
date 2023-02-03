import { Component, Input } from '@angular/core';
import { PanicDTO } from 'src/app/models/Panic';

@Component({
  selector: 'app-panic-notification',
  templateUrl: './panic-notification.component.html',
  styleUrls: ['./panic-notification.component.css']
})
export class PanicNotificationComponent {
  @Input() panic: PanicDTO;

  
}
