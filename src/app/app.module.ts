import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {BluetoothSerial} from '@awesome-cordova-plugins/bluetooth-serial/ngx'

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxSliderModule} from "@angular-slider/ngx-slider";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgxSliderModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, BluetoothSerial],
  bootstrap: [AppComponent],
})
export class AppModule {
}
