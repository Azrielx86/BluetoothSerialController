import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Devices', url: '/', icon: 'home' },
    { title: 'About', url: '/about', icon: 'information-circle' },
  ];
  constructor() {}
}
