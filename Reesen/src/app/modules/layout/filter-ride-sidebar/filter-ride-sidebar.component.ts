import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filter-ride-sidebar',
  templateUrl: './filter-ride-sidebar.component.html',
  styleUrls: ['./filter-ride-sidebar.component.css']
})
export class FilterRideSidebarComponent {
  @Output() showFiller : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() kindsOfSort : EventEmitter<string> = new EventEmitter<string>();

  changeState() {
    this.showFiller.emit(false);
  }

  setSortFilter(sort : string) {
    this.kindsOfSort.emit(sort);
  }

}
