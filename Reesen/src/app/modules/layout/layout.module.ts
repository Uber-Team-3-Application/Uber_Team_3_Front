import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapModule } from '../map/map.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DriverNavbarComponent } from './navbar/driver-navbar/driver-navbar.component';
import { PassengerNavbarComponent } from './navbar/passenger-navbar/passenger-navbar.component';
import { AdminNavbarComponent } from './navbar/admin-navbar/admin-navbar.component';
import { UnregisteredUserNavbarComponent } from './navbar/unregistered-user-navbar/unregistered-user-navbar.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { RideMapComponent } from './ride-map/ride-map.component';
import { UserCardComponent } from './user-card/user-card.component';
import {MatCardModule} from "@angular/material/card";
import { UnregisteredHomeComponent } from './unregistered-home/unregistered-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PassengerHomeComponent } from './passenger-home/passenger-home.component';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    NavbarComponent,
    DriverNavbarComponent,
    PassengerNavbarComponent,
    AdminNavbarComponent,
    UnregisteredUserNavbarComponent,
    RideMapComponent,
    UserCardComponent,
    UnregisteredHomeComponent,
    AdminHomeComponent,
    PassengerHomeComponent,
    DriverHomeComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        MapModule,
        MatSlideToggleModule,
        MatCardModule
    ],
    exports: [AboutComponent, HomeComponent, NavbarComponent, MatSlideToggleModule, RideMapComponent, UserCardComponent]
})
export class LayoutModule { }
