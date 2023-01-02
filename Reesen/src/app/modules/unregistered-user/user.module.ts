import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/resetPassword.component';



@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [ResetPasswordComponent]
})
export class UserModule { }
