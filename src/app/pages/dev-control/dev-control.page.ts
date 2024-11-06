import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BluetoothDevice} from "../../typings/BluetoothDevice";
import {NavController, Platform} from "@ionic/angular";
import {catchError, map, Observable, of, tap} from "rxjs";
import {BluetoothSerial} from "@awesome-cordova-plugins/bluetooth-serial/ngx";
import {ToastController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-dev-control',
  templateUrl: './dev-control.page.html',
  styleUrls: ['./dev-control.page.scss']
})
export class DevControlPage implements OnInit, OnDestroy {
  public deviceName: string = "";
  public isConnected: boolean = false;
  private device!: BluetoothDevice;

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private toastController: ToastController,
    private router: Router,
    private nav: NavController,
    private platform: Platform,
    private ngZone: NgZone) {
  }

  async ngOnInit() {
    if (this.router.getCurrentNavigation()?.extras.state == undefined)
      await this.nav.pop();

    this.device = this.router.getCurrentNavigation()?.extras.state!['device'];
    this.deviceName = this.device.name;
    console.log(`Trying to connect to ${this.device.address}`);

    if (this.platform.is('desktop')) {
      console.warn("Ionic web development active.");
      this.isConnected = true;
      return;
    }

    this.bluetoothSerial.connect(this.device.address)
      .pipe(
        tap(success => {
          console.log(`Connected! ${success}`);

          this.ngZone.run(() => {
            this.isConnected = true;
          });

          this.bluetoothSerial.subscribe('\n')
            .pipe(
              tap(data => {
                this.onMessageReceived(data);
              })
            ).subscribe();
        }),
        catchError((async (err, obs) => {
            const toast = await this.toastController.create({
              message: err,
              position: 'bottom',
              duration: 3500,
              header: "Connection error"
            });
            await toast.present();
            await this.nav.pop();
            return obs;
          })
        ))
      .subscribe();
  }

  ngOnDestroy() {
    this.disconnectDevice();
  }

  disconnectDevice = () => {
    this.bluetoothSerial.disconnect().then(() => {
      console.log("Exited device page");
    });
  };

  onDisconnectClick = async () => {
    await this.nav.pop();
  };

  onMessageReceived = (data: string) => {
    console.log(`Message received: ${data}`);
  };

}
