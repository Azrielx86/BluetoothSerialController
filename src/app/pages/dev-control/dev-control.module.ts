import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevControlPageRoutingModule } from './dev-control-routing.module';

import { DevControlPage } from './dev-control.page';
import {NgxSliderModule} from "@angular-slider/ngx-slider";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevControlPageRoutingModule,
    NgxSliderModule
  ],
  declarations: [DevControlPage]
})
export class DevControlPageModule {}
