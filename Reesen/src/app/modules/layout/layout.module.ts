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



@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    NavbarComponent,
    DriverNavbarComponent,
    PassengerNavbarComponent,
    AdminNavbarComponent,
    UnregisteredUserNavbarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MapModule,
    MatSlideToggleModule

  ],
  exports: [AboutComponent, HomeComponent, NavbarComponent, MatSlideToggleModule]
})
export class LayoutModule { }
