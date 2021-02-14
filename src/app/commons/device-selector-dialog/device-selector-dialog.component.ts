import {Component, Inject, OnInit} from '@angular/core';
import {DeviceConfiguration} from '../../models/DeviceConfiguration';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SceneDialogComponent} from '../scene-dialog/scene-dialog.component';
const _ = require('lodash');

export interface DialogData{
  devicesList: Array<DeviceConfiguration>;
  selectedDevices: Array<DeviceConfiguration>;
  roomName: string;
}

@Component({
  selector: 'app-device-selector-dialog',
  templateUrl: './device-selector-dialog.component.html',
  styleUrls: ['./device-selector-dialog.component.css']
})
export class DeviceSelectorDialogComponent implements OnInit {
  devicesList: Array<DeviceConfiguration>;
  roomName: string;
  selectedDevicesList: Array<DeviceConfiguration>;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.devicesList = data.devicesList;
    this.roomName = data.roomName;
    this.selectedDevicesList = data.selectedDevices || [];
}

  ngOnInit(): void {
  }

  checkIfSelected(device: DeviceConfiguration){
    return !!_.find(this.selectedDevicesList, {serial: device.serial});
  }

  addSelectedDevice(addedDevice: DeviceConfiguration){
    this.selectedDevicesList.push(addedDevice);
  }

  deleteSelectedDevice(unselectedDevice: DeviceConfiguration){
    this.selectedDevicesList = _.reject(this.selectedDevicesList, (device: DeviceConfiguration) => {
      return device.serial === unselectedDevice.serial;
    });
  }

}
