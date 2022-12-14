import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';

@Component({
  selector: 'app-driver-account',
  templateUrl: './driver-account.component.html',
  styleUrls: ['./driver-account.component.css']
})
export class DriverAccountComponent implements OnInit{
    driver:Driver = {
      name: '',
      surname: '',
      profilePicture: '',
      telephoneNumber: '',
      email: '',
      address: ''
    };

    ngOnInit():void{
      
    }

}
