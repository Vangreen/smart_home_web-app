import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ColorPickerComponent} from '../color-picker/color-picker.component';
import {FirstScreenComponent} from '../../first-screen/first-screen.component';
import {WebsocketService} from '../../service/websocket.service';

@Component({
  selector: 'app-light-bulb-button',
  templateUrl: './light-bulb-button.component.html',
  styleUrls: ['./light-bulb-button.component.css']
})
export class LightBulbButtonComponent implements OnInit {

  constructor(
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private firstScreen: FirstScreenComponent,
    private webSocket: WebsocketService
  ) {
  }

  public stompClient;
  public msg = [];
  @Input() serial: number;
  @Input() name: string;
  @Input() hsv: Array<number>;
  @Input() status: string;
  toggle = true;
  img = 'assets/svg/lights/light_on.svg';
  disableClick = false;

  ngOnInit(): void {
    if (this.status === 'Off') {
      this.toggleButton();
    }
    this.webSocket.subscribe('/device/device/' + this.serial, this.connect_callback);
  }

  connect_callback = (message) => {
    this.msg.push(message.body);
    const config = JSON.parse(message.body);
    if (config.task === 'status change' && config.status !== this.status) {
      this.toggleButton();
    } else if (config.task === 'color change') {
      this.hsv = [config.hue, config.saturation, config.brightness];
    } else if (config.hue !== undefined) {                                  // temp
      if (config.deviceStatus === 'On' && !this.toggle) {
        this.toggleButton();
      } else if (config.deviceStatus === 'Off' && this.toggle) {
        this.toggleButton();
      }
      this.hsv = [config.hue, config.saturation, config.brightness];
    }
  };

  toggleButton(): void {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
    this.img = this.toggle ? 'assets/svg/lights/light_on.svg' : 'assets/svg/lights/light_off.svg';
  }

  getStatus(): string {
    return this.status;
  }

  enableDisableRule(): void {
    this.toggleButton();
    const message = {
      status: this.status
    };
    this.webSocket.sendMessage('/device/changeDeviceStatus/' + this.serial, JSON.stringify(message));
  }

  onLongPress(): void {
    const bottomSheet = this._bottomSheet.open(ColorPickerComponent, {
      data: {status: this.status, hsv: this.hsv, serial: this.serial}
    });
    bottomSheet.afterDismissed().subscribe(data =>
      this.firstScreen.apiHandler()
    );
  }
}
