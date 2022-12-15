import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from 'src/app/services/map/map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{

  private map:any;
  constructor(private mapService: MapService){}

  private initMap():void{
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }
}
