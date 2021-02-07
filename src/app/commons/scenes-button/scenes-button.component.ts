import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
// import {ColorPickerComponent} from "../color-picker/color-picker.component"
import {ScenesDetailsComponent} from '../scenes-details/scenes-details.component';
import {environment} from "../../../environments/environment";

declare var SockJS;
declare var Stomp;

@Component({
  selector: 'app-scenes-button',
  templateUrl: './scenes-button.component.html',
  styleUrls: ['./scenes-button.component.css']
})
export class ScenesButtonComponent implements OnInit {

  constructor(private router: Router, private _bottomSheet: MatBottomSheet) {
  }

  @Input() serial: string;
  @Input() name: string;
  @Input() hsv: Array<number>;
  @Input() imgName: string;
  toggle = true;
  status = 'On';
  img: string;
  subject;
  disableClick = false;
  connectionStatus = 'Loading';
  public stompClient;
  public msg = [];

  ngOnInit(): void {
    console.log('HUEEEEEEEE');
    this.img = 'assets/svg/scenes/' + this.imgName;
    // const serverUrl = environment.serverURL + '/mywebsocket';
    // const ws = new SockJS(serverUrl);
    // this.stompClient = Stomp.over(ws);
    // const that = this;
    // this.stompClient.connect({}, function (frame) {
    //   that.stompClient.subscribe('/device/device/' + that.serial, (message) => {
    //     if (message.body) {
    //       that.msg.push(message.body);
    //       const config = JSON.parse(message.body);
    //       if (config.task === 'state change' || config.response === 'connected') {
    //         this.connectionStatus = '';
    //         if (config.state === 'On' && this.arrayEquals(this.hsv, [config.hue, config.saturation, config.brightness])) {
    //           console.log('on');
    //           // this.toggleButton();
    //           this.toggle = true;
    //         } else if (config.state === 'Off') {
    //           console.log('off');
    //           // this.toggleButton();
    //           this.toggle = false;
    //         } else if (!this.arrayEquals(this.hsv, [config.hue, config.saturation, config.brightness])) {
    //           console.log('off');
    //           // this.toggleButton();
    //           this.toggle = false;
    //         }
    //       } else if (config.task === 'color change') {
    //         console.log('ALFAAAAA');
    //
    //         if (config.state === 'On' && this.arrayEquals(this.hsv, [config.hue, config.saturation, config.brightness])) {
    //           console.log('on -color');
    //           console.log(this.arrayEquals(this.hsv, [config.hue, config.saturation, config.brightness]));
    //           // this.toggleButton();
    //           this.toggle = true;
    //         } else if (config.state === 'Off') {
    //           console.log('off');
    //           // this.toggleButton();
    //           this.toggle = false;
    //         } else if (!this.arrayEquals(this.hsv, [config.hue, config.saturation, config.brightness])) {
    //           console.log('off');
    //           // this.toggleButton();
    //           this.toggle = false;
    //         }
    //         // this.hsv = [msg.hue, msg.saturation, msg.brightness];
    //       }
    //     }
    //   });
    // });
  }

  arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  toggleButton() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
    // this.img = this.toggle ? 'assets/svg/light_on.svg' : 'assets/svg/light_off.svg';
  }

  getStatus() {
    return this.status;
  }

  enableDisableRule() {
    console.log('ENABLE DISABLE');
    console.log(this.serial);
    // if (this.status === 'On') {
    //   console.log('detect on off');
    //   const message = {
    //     task: 'state change',
    //     state: 'On',
    //     hue: this.hsv[0],
    //     saturation: this.hsv[1],
    //     brightness: this.hsv[2]
    //   };
    //   this.sendMessage('/device/changeDeviceColor/' + this.serial, JSON.stringify(message));
    // }
    // this.toggleButton();
    const message = {
      task: 'color change',
      status: this.status,
      hue: this.hsv[0],
      saturation: this.hsv[1],
      brightness: this.hsv[2]
    };
    this.sendMessage('/device/changeDeviceColor/' + this.serial, JSON.stringify(message));
  }

  sendMessage(path, message) {
    this.stompClient.send(path, {}, message);
  }


  onLongPress() {
    this._bottomSheet.open(ScenesDetailsComponent, {
      data: {name: this.name, hsv: this.hsv, img: this.imgName}
    });
  }

}
