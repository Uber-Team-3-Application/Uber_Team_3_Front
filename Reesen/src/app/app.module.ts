import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { DriverAccountComponent } from './components/driver-account/driver-account.component';
import { DriverInboxComponent } from './components/driver-inbox/driver-inbox.component';
import { DriverFavouriteRoutesComponent } from './components/driver-favourite-routes/driver-favourite-routes.component';
import { DriverRideHistoryComponent } from './components/driver-ride-history/driver-ride-history.component';
import { DriverReportsComponent } from './components/driver-reports/driver-reports.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    AboutComponent,
    HomeComponent,
    DriverProfileComponent,
    DriverAccountComponent,
    DriverInboxComponent,
    DriverFavouriteRoutesComponent,
    DriverRideHistoryComponent,
    DriverReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
