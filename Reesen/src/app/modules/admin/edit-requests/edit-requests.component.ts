import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverEditBasicInfoRequest, DriverEditVehicleRequest } from 'src/app/models/Driver';
import { DriverService } from '../../driver/services/driver.service';

@Component({
  selector: 'app-edit-requests',
  templateUrl: './edit-requests.component.html',
  styleUrls: ['./edit-requests.component.css']
})
export class EditRequestsComponent implements OnInit{

  vehicleRequests: DriverEditVehicleRequest[];
  profileRequests: DriverEditBasicInfoRequest[];

  profileClicked: boolean = false;
  vehicleClicked: boolean = false;

  constructor(private router:Router,
              private driverService: DriverService){}

  showProfileRequests():void{
    this.profileClicked = true;
    this.vehicleClicked = false;

    this.loadProfileRequests();
  }
  showVehicleRequests():void{
    this.vehicleClicked = true;
    this.profileClicked = false;

    this.loadVehicleRequests();

  }

  loadProfileRequests(): void{
    this.driverService.getProfileEditRequests()
        .subscribe(
          (res) => {this.profileRequests = res;console.log(res);}
        );
  }
  loadVehicleRequests(): void{
    this.driverService.getVehicleEditRequests()
        .subscribe(
          (res) => {this.vehicleRequests = res;console.log(res);}
        );
  }

  goBack():void{
    this.router.navigate(['users']);
  }

  
  ngOnInit(): void {
    
  }
}
