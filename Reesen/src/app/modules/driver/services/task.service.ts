import { Injectable } from '@angular/core';
import {TableRideContent} from "../driver-ride-history/driver-ride-history.component";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskArray: TableRideContent[] = [];

  fillTable(task: TableRideContent){
    this.taskArray.push(task);

  }

  deleteArray() {
    this.taskArray.splice(0, this.taskArray.length);
  }
}
