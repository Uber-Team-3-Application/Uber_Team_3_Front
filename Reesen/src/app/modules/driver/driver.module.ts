import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverAccountComponent } from './driver-account/driver-account.component';
import { DriverEditBasicInfoComponent } from './driver-edit-basic-info/driver-edit-basic-info.component';
import { DriverEditPasswordComponent } from './driver-edit-password/driver-edit-password.component';
import { DriverEditVehicleInfoComponent } from './driver-edit-vehicle-info/driver-edit-vehicle-info.component';
import { DriverInboxComponent } from './driver-inbox/driver-inbox.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { DriverReportsComponent } from './driver-reports/driver-reports.component';
import { DriverRideHistoryComponent } from './driver-ride-history/driver-ride-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from "@angular/material/card";
import { DriverCardHistoryComponent } from './driver-card-history/driver-card-history.component';
import { DriverCardHistoryResponsiveComponent } from './driver-card-history-responsive/driver-card-history-responsive.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {LayoutModule} from "../layout/layout.module";


@NgModule({
  declarations: [DriverAccountComponent,
              DriverEditBasicInfoComponent,
              DriverEditPasswordComponent,
              DriverEditVehicleInfoComponent,
              DriverInboxComponent,
              DriverProfileComponent,
              DriverReportsComponent,
              DriverRideHistoryComponent,
              DriverCardHistoryComponent,
              DriverCardHistoryResponsiveComponent,

            ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatSidenavModule,
    LayoutModule,

  ],
  exports:[DriverAccountComponent,
    DriverEditBasicInfoComponent,
    DriverEditPasswordComponent,
    DriverEditVehicleInfoComponent,
    DriverInboxComponent,
    DriverProfileComponent,
    DriverReportsComponent,
    DriverRideHistoryComponent]
})
export class DriverModule { }
