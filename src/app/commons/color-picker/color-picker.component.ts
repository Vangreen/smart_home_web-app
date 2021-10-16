import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ColorEvent} from 'ngx-color';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from '@angular/material/bottom-sheet';
import iro from '@jaames/iro';
import {ApiService} from '../../service/api.service';
import {SnackbarService} from '../snack-bar/snackbar.service';
import {map, takeUntil} from 'rxjs/operators';
import {DeviceService} from '../../service/device.service';
import {Subject} from 'rxjs';
import {DeviceConfiguration} from '../../models/DeviceConfiguration';
const _ = require('lodash');

export interface DialogData {
  deviceConfiguration: DeviceConfiguration;
}

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit, OnDestroy {
  deviceConfiguration: DeviceConfiguration;
  butHue: number;
  colors: string[];
  speedOptions = [
    {value: 200, viewValue: 'slow'},
    {value: 100, viewValue: 'normal'},
    {value: 40, viewValue: 'fast'}
  ];
  selected;
  executedColorPicker = false;
  executedColorSlider = false;
  colorPicker: iro.ColorPicker;
  colorSlider: iro.ColorPicker;
  checked: boolean = false;
  private unsubscribeSubject: Subject<void> = new Subject<void>();


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    private apiService: ApiService,
    private _bottomSheet: MatBottomSheet,
    private snackBarService: SnackbarService,
    private webSocketService: DeviceService,
    private deviceService: DeviceService
  ) {
    this.deviceConfiguration = data.deviceConfiguration;
    if (this.deviceConfiguration.floatingStatus === 'On'){
      this.checked = true;
    }
    this.selected = _.find(this.speedOptions, ['value', this.deviceConfiguration.floatingSpeed]);
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

  connect_callback(message) {
    console.log(message);
  }

  changeColor($event: ColorEvent): void {
    console.log('COLOR CHANGE PICKER');
    console.log(Math.round($event.color.hsv.h));
    this.butHue = Math.round($event.color.hsv.h);
    const sat = 100;
    const message = {
      task: 'color change',
      deviceStatus: this.deviceConfiguration.deviceStatus,
      hue: this.butHue,
      saturation: sat,
      brightness: this.deviceConfiguration.brightness,
      floatingStatus: 'Off',
      floatingSpeed: this.deviceConfiguration.floatingSpeed
    };
    this.checked = false;
    this.deviceConfiguration.floatingStatus = 'Off';
    this.deviceConfiguration.hue = this.butHue;
    this.webSocketService.changeDeviceColor(this.deviceConfiguration.serial, message);
  }

  changeColorCircle(element: iro.ColorPicker): void {
    console.log(element.color.hsv);
    console.log('COLOR CHANGE PICKER Circle');
    this.butHue = element.color.hsv.h;
    let floating;
    if (element === this.colorSlider && this.checked){
      floating = 'On';
    }else{
      floating = 'Off';
      this.checked = false;
      this.deviceConfiguration.floatingStatus = 'Off';
    }
    const message = {
      task: 'color change',
      deviceStatus: this.deviceConfiguration.deviceStatus,
      hue: element.color.hsv.h,
      saturation: element.color.hsv.s,
      brightness: element.color.hsv.v,
      floatingStatus: floating,
      floatingSpeed: this.deviceConfiguration.floatingSpeed
    };
    this.webSocketService.changeDeviceColor(this.deviceConfiguration.serial, message);
  }

  tabClick(tab) {
    console.log(tab.index);
    if (tab.index === 1 && this.executedColorPicker === false) {
      console.log('deviceconf: ', this.deviceConfiguration);
      this.executedColorPicker = true;
      this.colorPicker = iro.ColorPicker('#picker', {
        width: 280,
        color: {h: this.deviceConfiguration.hue, s: this.deviceConfiguration.saturation, v: this.deviceConfiguration.brightness},
        // color: "#0f0",
        borderWidth: 1,
        borderColor: '#fff',
      });
    } else if (tab.index === 1) {
      this.colorPicker.color.hsv = {
        h: this.deviceConfiguration.hue,
        s: this.deviceConfiguration.saturation,
        v: this.deviceConfiguration.brightness
      };
    } else if (tab.index === 2 && this.executedColorSlider === false) {
      this.executedColorSlider = true;
      this.colorSlider = iro.ColorPicker('#slider', {
        color: {h: this.deviceConfiguration.hue, s: this.deviceConfiguration.saturation, v: this.deviceConfiguration.brightness},
        layout: [
          {
            component: iro.ui.Slider,
            options: {
              sliderType: 'value'
            }
          }
        ]
      });
    }else if (tab.index === 2){
      this.colorSlider.color.hsv = {
        h: this.deviceConfiguration.hue,
        s: this.deviceConfiguration.saturation,
        v: this.deviceConfiguration.brightness
      };
    }
  }

  renameDevice(newName: string) {
    this.deviceService.changeDeviceName(this.deviceConfiguration.serial, newName);
  }

  onDeleteClick() {
    this.apiService.deleteDevice(this.deviceConfiguration.serial);
    this._bottomSheet.dismiss();
    this.snackBarService.openSnackBar('Urządzenie usunięte');
  }

  changeSpeed(){
    this.deviceConfiguration.floatingSpeed = this.selected.value;
    const message = {
      deviceStatus: this.deviceConfiguration.deviceStatus,
      floatingStatus: this.deviceConfiguration.floatingStatus,
      floatingSpeed: this.deviceConfiguration.floatingSpeed
    };
    this.deviceService.changeDeviceStatus(this.deviceConfiguration.serial, message);
  }

  floatingTrigger(checked: boolean) {
    console.log(checked);
    this.checked = checked;
    this.deviceConfiguration.floatingStatus = this.checked ? 'On' : 'Off';
    const message = {
      deviceStatus: this.deviceConfiguration.deviceStatus,
      floatingStatus: this.deviceConfiguration.floatingStatus,
      floatingSpeed: this.deviceConfiguration.floatingSpeed
    };
    this.deviceService.changeDeviceStatus(this.deviceConfiguration.serial, message);
  }

}
