import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DeviceService} from '../../service/device.service';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ColorEvent} from 'ngx-color';
import iro from '@jaames/iro';
import {DeviceConfiguration} from '../../models/DeviceConfiguration';

export interface DialogData {
  deviceConfiguration: DeviceConfiguration;
}

@Component({
  selector: 'app-color-picker-sceneries',
  templateUrl: './color-picker-sceneries.component.html',
  styleUrls: ['./color-picker-sceneries.component.css']
})
export class ColorPickerSceneriesComponent implements OnInit, OnDestroy {
  deviceConfiguration: DeviceConfiguration;
  butHue: number;
  colors: string[];
  colorPicker: iro.ColorPicker;
  executed = false;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private webSocketService: DeviceService
  ) {
    this.deviceConfiguration = data.deviceConfiguration;
    this.colors = ['#FFFFFF', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];
  }

  ngOnInit(): void {
    this.webSocketService
      .deviceColorConf(this.deviceConfiguration.serial)
      .pipe(map(deviceConfig => this.connect_callback(deviceConfig)), takeUntil(this.unsubscribeSubject))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  connect_callback(message){
    console.log(message);
  }

  changeColor($event: ColorEvent): void {
    console.log('COLOR CHANGE PICKER');
    console.log(Math.round($event.color.hsv.h));
    this.butHue = Math.round($event.color.hsv.h);
    const sat = 100;
    const message = {
      task: 'color change',
      status: this.deviceConfiguration.deviceStatus,
      hue: this.butHue,
      saturation: sat,
      brightness: this.deviceConfiguration.brightness
    };
    this.webSocketService.changeDeviceColor(this.deviceConfiguration.serial, message);
    this.deviceConfiguration.hue = this.butHue;
  }

  changeColorCircle(): void {
    console.log(this.colorPicker.color.hsv);
    console.log('COLOR CHANGE PICKER Circle');
    this.butHue = this.colorPicker.color.hsv.h;
    const message = {
      task: 'color change',
      status: this.deviceConfiguration.deviceStatus,
      hue: this.colorPicker.color.hsv.h,
      saturation: this.colorPicker.color.hsv.s,
      brightness: this.colorPicker.color.hsv.v
    };
    this.webSocketService.changeDeviceColor(this.deviceConfiguration.serial, message);
  }

  tabClick(tab) {
    console.log(tab.index);
    if (tab.index === 1 && this.executed === false) {
      this.executed = true;
      this.colorPicker = iro.ColorPicker('#picker', {
        width: 280,
        color: {h: this.deviceConfiguration.hue, s: this.deviceConfiguration.saturation, v: this.deviceConfiguration.brightness},
        // color: "#0f0",
        borderWidth: 1,
        borderColor: '#fff',
      });
    }else if (tab.index === 1){
      this.colorPicker.color.hsv = {h: this.deviceConfiguration.hue, s: this.deviceConfiguration.saturation, v: this.deviceConfiguration.brightness};
    }
  }

}
