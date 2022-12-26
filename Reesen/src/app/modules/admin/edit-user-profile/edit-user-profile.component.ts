import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/Driver';
import { Passenger } from 'src/app/models/Passenger';
import { User } from 'src/app/models/User';
import { DriverService } from '../../driver/services/driver.service';
import { PassengerService } from '../../passenger/passenger.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit{
  id: string;
  role: string;
  user: User;
  avatarBase64: string = "";
  numId: number;
  constructor(private route: ActivatedRoute, 
    private passengerService: PassengerService,
    private driverService: DriverService,
    private router: Router){}

    editForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      blocked: new FormControl(false, [])
    });
    hasError: boolean;
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.role = this.route.snapshot.paramMap.get('role');
      this.numId = +this.id;
      if(this.role === 'DRIVER'){
        this.getDriver(this.numId);
      }else this.getPassenger(this.numId);

      if(this.role === "DRIVER"){
        
        this.driverService.get(this.numId)
          .subscribe(
            (res) => {this.user = res;}
          )
      }
      else{
        this.passengerService.get(this.numId)
          .subscribe(
            (res) => {this.user = res;}
          )
      }
    }
  
    getDriver(id:number): void{
      this.driverService.get(id)
          .subscribe(
            (driver) => {this.user = driver; 
              console.log(this.user);
              this.avatarBase64 = this.user.profilePicture;
            }
          );
    }
  
    getPassenger(id:number): void{
      this.passengerService.get(id)
          .subscribe(
            (passenger) => {
              this.user = passenger;
              console.log(this.user);
              this.avatarBase64 = this.user.profilePicture;
            }
          );
    }
    handleUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.avatarBase64 = reader.result.toString();
          this.user.profilePicture = this.avatarBase64;
      };
    }

    goBack():void{
      this.router.navigate(['users/' + this.id + '/' + this.role])
    }

    editProfile():void{
       if(this.editForm.valid){
        this.hasError = false;
        
        if(this.role === "DRIVER"){
          this.driverService.edit(this.getDriverFromForm(), this.numId).subscribe((res: any) => {
            console.log(res);
          });
        }else{
          this.passengerService.edit(this.getPassengerFromForm(), this.numId).subscribe((res: any) => {
            console.log(res);
          });
        }
        
        alert("Succesfully edited profile!");
        this.goBack();
       }else{
        this.hasError = true;
       }
    }

    getPassengerFromForm():Passenger{
      const passenger: Passenger = {
        name : this.editForm.value.name,
        surname : this.editForm.value.surname,
        profilePicture : this.avatarBase64,
        telephoneNumber : this.editForm.value.phoneNumber,
        email : this.editForm.value.email,
        address : this.editForm.value.address,
        password : null,
      };
      return passenger;
    }

    getDriverFromForm(): Driver{
      const driver: Driver = {
        name : this.editForm.value.name,
        surname : this.editForm.value.surname,
        profilePicture : this.avatarBase64,
        telephoneNumber : this.editForm.value.phoneNumber,
        email : this.editForm.value.email,
        address : this.editForm.value.address,
        password : null,
      };
      return driver;
    }

}
