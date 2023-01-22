import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './modules/layout/layout.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { DriverModule } from './modules/driver/driver.module';
import { UserModule } from './modules/unregistered-user/user.module';
import {Interceptor} from './modules/auth/interceptor/interceptor';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { A11yModule } from '@angular/cdk/a11y';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config: SocketIoConfig = { url: 'http://localhost:8082', options: {} };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    PassengerModule,
    AdminModule,
    AuthModule,
    DriverModule,
    UserModule,
    MatTableModule,
    MatSortModule,
    A11yModule,
    SocketIoModule.forRoot(config),
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    {  provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
