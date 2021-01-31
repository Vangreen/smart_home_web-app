import {Component, Input, OnInit} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {Router} from '@angular/router';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ColorPickerComponent} from "../color-picker/color-picker.component"
declare var SockJS;
declare var Stomp;

@Component({
  selector: 'app-light-bulb-button',
  templateUrl: './light-bulb-button.component.html',
  styleUrls: ['./light-bulb-button.component.css']
})
export class LightBulbButtonComponent implements OnInit {

  constructor(private router: Router, private _bottomSheet: MatBottomSheet) {
  }

  public stompClient;
  public msg = [];
  @Input() url: string;
  @Input() serial: number;
  @Input() name: string;
  @Input() hsv: Array<number>;
  @Input() status: string;
  toggle = true;
  img = 'assets/svg/light_on.svg';
  subject;
  disableClick = false;
  connectionStatus = 'Loading';

  ngOnInit(): void {
    if (this.status === 'off'){
      this.toggleButton();
    }
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://192.168.2.166:9999/mywebsocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/device/device/' + that.serial, (message) => {
        if (message.body) {
          that.msg.push(message.body);
          const config = JSON.parse(message.body);
          if (config.task === 'state change' && config.state !== that.status){
            that.toggleButton();
          }else if (config.task === 'color change'){
            that.hsv = [config.hue, config.saturation, config.brightness];
          }else{
            if (config.deviceState === 'On' && !that.toggle) {
              that.toggleButton();
            } else if (config.deviceState === 'Off' && that.toggle) {
              that.toggleButton();
            }
            that.hsv = [config.hue, config.saturation, config.brightness];
          }
        }
      });
    });
  }

  sendMessage(path, message) {
    this.stompClient.send(path , {}, message);
  }

  toggleButton() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
    this.img = this.toggle ? 'assets/svg/lights/light_on.svg' : 'assets/svg/lights/light_off.svg';
  }

  getStatus() {
    return this.status;
  }

  enableDisableRule() {
    this.toggleButton();
    this.sendMessage('/device/changeDeviceState/' + this.serial, '{"state": "' + this.status + '"}');
  }

  onLongPress() {
    this._bottomSheet.open(ColorPickerComponent, {
      data: {url: this.url, state: this.status, hsv: this.hsv}
    });
  }
}
