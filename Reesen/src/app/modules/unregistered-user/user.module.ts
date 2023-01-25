import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UnregisteredHomeComponent } from './unregistered-home/unregistered-home.component';



@NgModule({
  declarations: [ResetPasswordComponent, UnregisteredHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [ResetPasswordComponent]
})
export class UserModule { }
