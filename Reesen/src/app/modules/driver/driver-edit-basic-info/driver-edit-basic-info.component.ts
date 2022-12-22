import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/Driver';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver-edit-basic-info',
  templateUrl: './driver-edit-basic-info.component.html',
  styleUrls: ['./driver-edit-basic-info.component.css']
})
export class DriverEditBasicInfoComponent implements OnInit{
    
    editForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)])
        
    });
    hasError: boolean = false;
    driver:Driver = {
      name: '',
      surname: '',
      profilePicture: '',
      telephoneNumber: '',
      email: '',
      address: ''
    };
    constructor(private driverService: DriverService, private router: Router){
      
    }

    ngOnInit(): void {
      
      this.driverService.get(2)
      .subscribe(
        (driver) => (this.driver = driver)
      );

    }


    edit():void{
       if(this.editForm.valid){
        this.hasError = false;
        alert("Succesfully changed information!");
        this.router.navigate(['/driverProfile'])
        

       }else{
        this.hasError = true;
       }
       
    }
}


