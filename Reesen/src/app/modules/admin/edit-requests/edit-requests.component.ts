import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DriverEditBasicInfoRequest, DriverEditVehicleRequest } from 'src/app/models/Driver';
import { DriverService } from '../../driver/services/driver.service';

@Component({
  selector: 'app-edit-requests',
  templateUrl: './edit-requests.component.html',
  styleUrls: ['./edit-requests.component.css']
})
export class EditRequestsComponent {

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
        .subscribe({
          next: (result) => {
            this.profileRequests = result;
            console.log(result);
          },
          error: (error) => {
            this.profileRequests = [];
            console.log(error);
          }
       });
  }
  loadVehicleRequests(): void{
    this.driverService.getVehicleEditRequests()
        .subscribe({
          next: 
          (result) => {
            this.vehicleRequests = result;
            console.log(result);
          },
          error: (error) =>{ this.vehicleRequests = [];}
        });
  }

  goBack():void{
    this.router.navigate(['users']);
  }
  
  acceptVehicleRequest(vehicle: DriverEditVehicleRequest){
        
    this.driverService.acceptVehicleEditRequest(vehicle.id)
          .subscribe(
            {
              next:
              (res) =>{ this.loadVehicleRequests();},
              error: (error) =>{ this.loadVehicleRequests(); }
            }
          );
  }

  declineVehicleRequest(vehicle: DriverEditVehicleRequest){
    this.driverService.declineVehicleEditRequest(vehicle.id)
        .subscribe(
            {
              next:
              (res) =>{ this.loadVehicleRequests();},
              error: (error) =>{ this.loadVehicleRequests(); }
            }
        );
  }


  acceptProfileRequest(profile: DriverEditBasicInfoRequest){
      this.driverService.acceptProfileEditRequest(profile.id)
          .subscribe(
            {
              next:
              (res) =>{ this.loadProfileRequests();},
              error: (error) =>{ this.loadProfileRequests(); }
            }
          );
  }

  declineProfileRequest(profile: DriverEditBasicInfoRequest){
    this.driverService.declineProfileEditRequest(profile.id)
        .subscribe(
          {
            next:
            (res) =>{ this.loadProfileRequests();},
            error: (error) =>{ this.loadProfileRequests(); }
          }
        );
      
  }
}

