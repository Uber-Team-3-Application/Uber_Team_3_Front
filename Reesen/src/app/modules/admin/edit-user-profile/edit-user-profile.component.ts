import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, 
    private passengerService: PassengerService,
    private driverService: DriverService,
    private router: Router){}

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.role = this.route.snapshot.paramMap.get('role');
      let numId: number = +this.id;
      if(this.role === 'DRIVER'){
        this.getDriver(numId);
      }else this.getPassenger(numId);
  
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
}
