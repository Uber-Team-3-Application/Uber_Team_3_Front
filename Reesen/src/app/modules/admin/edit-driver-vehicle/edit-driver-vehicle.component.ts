import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Vehicle } from 'src/app/models/Vehicle';
import { DriverService } from '../../driver/services/driver.service';
import { VehicleService } from '../../driver/services/vehicle.service';

@Component({
  selector: 'app-edit-driver-vehicle',
  templateUrl: './edit-driver-vehicle.component.html',
  styleUrls: ['./edit-driver-vehicle.component.css']
})
export class EditDriverVehicleComponent implements OnInit{
  id: string;
  user: User;
  role: string;
  avatarBase64 = "";
  numId: number;
  vehicle: Vehicle;
  hasLoaded = false;

  editVehicleForm = new FormGroup({
    model: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]),
    licenseNumber: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
    type: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numberOfSeats: new FormControl('', [Validators.required, Validators.minLength(1)]),
    babyTransport: new FormControl(false, []),
    petTransport: new FormControl(false, [])
  });
  hasError: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private driverService: DriverService,
              private vehicleService: VehicleService){}

  ngOnInit(): void {
    this.hasLoaded = false;
    this.id = this.route.snapshot.paramMap.get('id');
    this.numId = +this.id;
    this.role = this.route.snapshot.paramMap.get('role');
      
      this.driverService.get(this.numId)
        .subscribe(
          (res) => {this.user = res;
                  console.log(res);
          }
        )
      this.vehicleService.get(this.numId)
          .subscribe(
            (res) => {this.vehicle = res;
              this.vehicleService.getVehicleLocation(this.vehicle.id)
                    .subscribe(
                      {
                        next: (result) =>{
                            this.vehicle.currentLocation = result;
                            this.hasLoaded = true;
                        },
                        error: (error) => {console.log(error);}
                      }
                    )
              
            }
          )
     
  }

  goBack():void{
    this.router.navigate(['users/' + this.id + '/' + this.role])
  }

  editVehicle():void{
    if(this.editVehicleForm.valid){
      this.hasError = false;
      
      this.vehicleService.editAsAdmin(this.vehicle, this.numId)
          .subscribe(
              (res) => {console.log(res);}
          );
      alert("Succesfully changed information!");
      this.goBack();

     }else{
      this.hasError = true;
     }
  }
}
