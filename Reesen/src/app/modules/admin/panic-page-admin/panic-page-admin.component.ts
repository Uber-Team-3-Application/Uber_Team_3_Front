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

  panics: PanicDTO[];
  hasLoaded = false;

  constructor(private panicService: PanicService){}

  ngOnInit(): void {
     this.hasLoaded = false;
     this.getPanic();
  }

  private getPanic() {
      this.panicService.get().subscribe(
        {
          next:(result) =>{
              this.panics = result.results;
              this.hasLoaded = true;
          },
          error:(error) =>{
            console.log(error);
          }
        }
      )
  }



}
