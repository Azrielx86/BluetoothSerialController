import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {BluetoothDevice} from "../../typings/BluetoothDevice";
import {BluetoothSerial} from "@awesome-cordova-plugins/bluetooth-serial/ngx";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss']
})
export class DevicesPage implements OnInit {
  public devices: BluetoothDevice[] = [];

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private platform: Platform,
    private nav: NavController
  ) {
  }

  async ngOnInit() {
    if (this.platform.is('desktop')) {
      console.log("Web app");
      this.devices.push(
        {
          "name": "Test",
          "address": "11:11:11:11:11",
          "id": "11:11:11:11:11",
          class: 2
        },
        {
          "name": "Other Device",
          "address": "00:00:00:00:00",
          "id": "00:00:00:00:00",
          class: 1
        }
      );
    } else {
      console.log("Other device.");
      await this.bluetoothSerial.enable();
      this.devices = await this.bluetoothSerial.list() as BluetoothDevice[];
    }
  }

  onBtConnectClick = async (device: BluetoothDevice) => {
    await this.nav.navigateForward('dev-control', {state: {device}});
  };
}
