import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevControlPageRoutingModule } from './dev-control-routing.module';

import { DevControlPage } from './dev-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevControlPageRoutingModule
  ],
  declarations: [DevControlPage]
})
export class DevControlPageModule {}
