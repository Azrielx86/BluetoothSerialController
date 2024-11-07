import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {BluetoothDevice} from "../../typings/BluetoothDevice";
import {NavController, Platform} from "@ionic/angular";
import {catchError, tap} from "rxjs";
import {BluetoothSerial} from "@awesome-cordova-plugins/bluetooth-serial/ngx";
import {ToastController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-dev-control',
  templateUrl: './dev-control.page.html',
  styleUrls: ['./dev-control.page.scss']
})
export class DevControlPage implements OnInit, OnDestroy {
  @ViewChild("hstTextArea") hstTextArea!: ElementRef;
  public deviceName: string = "";
  public isConnected: boolean = false;
  public messageBuffer: string = "";
  private historyBuffer: string[] = [];
  public historyBufferText: string = "";
  private maxMessages: number = 100;
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

  disconnectDevice = (): void => {
    this.bluetoothSerial.disconnect().then(() => {
      console.log("Exited device page");
    });
  };

  onDisconnectClick = async (): Promise<void> => {
    await this.nav.pop();
  };

  onMessageReceived = (data: string): void => {
    console.log(`Message received: ${data}`);
    this.appendMessageHistory(`[${this.deviceName}]> ${data}`);
  };

  sendMessage = async (data: number[]): Promise<void> => {
    await this.bluetoothSerial.write(data);
  };

  sendMessageBuffer = async (): Promise<void> => {
    await this.bluetoothSerial.write(this.messageBuffer.split('').map(c => c.charCodeAt(0)));
    this.appendMessageHistory(`[User]> ${this.messageBuffer}`);
    this.messageBuffer = "";
  };

  appendMessageHistory = (message: string): void => {
    this.historyBuffer.push(message);
    if (this.historyBuffer.length > this.maxMessages)
      this.historyBuffer.shift();

    this.ngZone.run(() => {
      this.historyBufferText = this.historyBuffer.join("\n");
    });
  };
}
