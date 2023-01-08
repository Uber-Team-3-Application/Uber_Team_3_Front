import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PassengerService } from '../passenger.service';
import { animate, AnimationBuilder, state, style, transition, trigger } from '@angular/animations';

export interface Element {
  startTime: string;
  endTime: string;
  totalCost: number;
  departure: string;
  destination: string;
}

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css'],
  animations: [
    trigger('arrowPosition', [
      state('start', style({
        transform: 'translateX(0)'
      })),
      state('end', style({
        transform: 'translateX(100%)'
      })),
      transition('start => end', [
        animate('1s')
      ]),
      transition('end => start', [
        animate('0.5s')
      ]),
    ])
  ]
})

export class RideHistoryComponent implements AfterViewInit {

  constructor(private animationBuilder: AnimationBuilder, private _liveAnnouncer: LiveAnnouncer, private passengerService: PassengerService) {}

  displayedColumns: string[] = ['startTime', 'endTime', 'totalCost', 'departure', 'destination'];
  rides = this.passengerService.getRides(3);
  ELEMENT_DATA = [{startTime: '19.12.2022. 22:13', endTime: '19.12.2022. 22:19', totalCost: 267, departure: 'Sujetska 2', destination: 'Dr. Tucakovic 2'},
  {startTime: '17.12.2022. 22:13', endTime: '17.12.2022. 22:19', totalCost: 267, departure: 'Sujetska 2', destination: 'Dr. Tucakovic 2'},
  {startTime: '21.12.2022. 22:13', endTime: '21.12.2022. 22:19', totalCost: 267, departure: 'Sujetska 2', destination: 'Dr. Tucakovic 2'}];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = 'startTime';
    this.dataSource.sort.direction = 'desc';
    this.dataSource.sort.sortChange.emit();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}