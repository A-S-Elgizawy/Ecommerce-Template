import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignRoutingModule } from './sign-routing.module';
import { SignComponent } from '../pages/website/sign/sign.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignRoutingModule,
    SignComponent
  ]
})
export class SignModule { }
