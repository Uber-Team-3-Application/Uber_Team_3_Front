import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanicDTO } from 'src/app/models/Panic';
import { PanicService } from './panic.service';

@Component({
  selector: 'app-panic-page-admin',
  templateUrl: './panic-page-admin.component.html',
  styleUrls: ['./panic-page-admin.component.css']
})
export class PanicPageAdminComponent {

  userId: number;
  userRole:string;
  panics: PanicDTO[];
  ratings = new Array();
  hasLoaded = false;
  selectedSort = "Start Time";
  page = 1;
  selectedShowNumber = 2;
  totalEntries = 0;

  constructor(private panicService: PanicService, 
            private route: ActivatedRoute){}

  ngOnInit(): void {
     this.hasLoaded = false;
     this.getDataFromUrl();
     this.getPanic();
  }

  private getPanic() {

  
  }



  private getDataFromUrl():void{
      const id = this.route.snapshot.paramMap.get('id');
      this.userId = +id;
      this.userRole = this.route.snapshot.paramMap.get('role');
  }


}
