import {Component, Inject, Input, OnInit} from '@angular/core';
import {ColorEvent} from 'ngx-color';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import iro from '@jaames/iro';
import {ApiService} from '../../service/api.service';
import {environment} from '../../../environments/environment';

declare var SockJS;
declare var Stomp;

export interface DialogData {
  url: string;
  status: string;
  hsv: Array<number>;
  serial: string;
}

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  @Input() url: string;
  status: string;
  serial: string;
  hsv: Array<number>;
  butHue: number;
  message: string;
  colors: string[];
  executed = false;
  colorPicker: iro.ColorPicker;
  public stompClient;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData, private apiService: ApiService) {


    this.url = data.url;
    this.status = data.status;
    // color palete
    this.colors = ['#FFFFFF', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];
    this.hsv = data.hsv;
    this.serial = data.serial;
  }

  ngOnInit(): void {
    console.log(this.url);
    console.log(this.status);
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = environment.serverURL + '/mywebsocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/device/changeDeviceColor/' + that.serial, (message) => {
      });
    });
  }

  sendMessage(path, message) {
    this.stompClient.send(path, {}, message);
  }

  changeColor($event: ColorEvent): void {
    console.log('COLOR CHANGE PICKER');
    console.log(Math.round($event.color.hsv.h));
    this.butHue = Math.round($event.color.hsv.h);
    const brightnessLoc = 50;
    const sat = 100;
    const message = {
      task: 'color change',
      status: this.status,
      hue: this.butHue,
      saturation: sat,
      brightness: brightnessLoc
    };
    this.sendMessage('/device/changeDeviceColor/' + this.serial, JSON.stringify(message));
  }

  changeColorCircle(): void {
    console.log(this.colorPicker.color.hsv);
    console.log('COLOR CHANGE PICKER Circle');
    this.butHue = this.colorPicker.color.hsv.h;
    // this.subject.subscribe();
    const message = {
      task: 'color change',
      status: this.status,
      hue: this.colorPicker.color.hsv.h,
      saturation: this.colorPicker.color.hsv.s,
      brightness: this.colorPicker.color.hsv.v
    };
    this.sendMessage('/device/changeDeviceColor/' + this.serial, JSON.stringify(message));

    // this.subject.next(message);
    // this.subject.complete();
  }

  tabClick(tab) {
    console.log(tab.index);
    // tab.index
    if (tab.index === 1 && this.executed === false) {
      console.log(this.hsv[2]);
      this.executed = true;
      this.colorPicker = iro.ColorPicker('#picker', {
        width: 280,
        color: {h: this.hsv[0], s: this.hsv[1], v: this.hsv[2]},
        // color: "#0f0",
        borderWidth: 1,
        borderColor: '#fff',
      });
    }
    this.colorPicker.color.hsv;
  }


  onDeleteClick() {
    this.apiService.unSetAdded(this.serial);
  }


}
