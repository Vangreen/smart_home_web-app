import {Component, Inject, OnInit} from '@angular/core';
import {DeviceConfiguration} from '../../../models/DeviceConfiguration';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DeviceSelectorDialogComponent} from '../../dialogs/device-selector-dialog/device-selector-dialog.component';
import {MatStepper} from '@angular/material/stepper';
import {SceneryService} from '../../../service/scenery.service';
import {RoomConfiguration} from '../../../models/RoomConfiguration';
import FloatingStatusChange from '../../../models/FloatingStatusChange';
const _ = require('lodash');



export interface DialogData {
  devicesList: Array<DeviceConfiguration>;
  room: RoomConfiguration;
}

@Component({
  selector: 'app-scene-dialog',
  templateUrl: './scene-dialog.component.html',
  styleUrls: ['./scene-dialog.component.css']
})
export class SceneDialogComponent implements OnInit {
  devicesList: Array<DeviceConfiguration>;
  selectedDevices: Array<DeviceConfiguration>;
  isEditable = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  sceneryName = null;
  room: RoomConfiguration;
  logos;

  selectedLogo: {id: number,
                  path: string};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private sceneryService: SceneryService
  ) {
    this.devicesList = data.devicesList;
    this.room = data.room;
    this.selectedLogo = { id: null, path: null};
    this.selectedDevices = [];
    this.logos = [{
      id: 1,
      path: 'assets/svg/scenes/night-mode.svg'
    },
      {
        id: 2,
        path: 'assets/svg/scenes/lightning.svg'
      },
      {
        id: 2,
        path: 'assets/svg/scenes/favorite.svg'
      }];
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      logoFormGroup: new FormControl('', Validators.required)
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  statusChanged(status: string, deviceSerial: number){
    _.set(_.find(this.selectedDevices, {serial: deviceSerial}), 'deviceStatus', status);
  }

  hsvChanged(hsv: Array<number>, deviceSerial: number){
    console.log('hsv: ', hsv);
    console.log('selected device:', _.find(this.selectedDevices, {serial: deviceSerial}));
    _.set(_.find(this.selectedDevices, {serial: deviceSerial}), 'hue', hsv[0]);
    _.set(_.find(this.selectedDevices, {serial: deviceSerial}), 'saturation', hsv[1]);
    _.set(_.find(this.selectedDevices, {serial: deviceSerial}), 'brightness', hsv[2]);
  }

  floatingChanged(floatingStatusChanged: FloatingStatusChange, deviceSerial: number){
    _.set(_.find(this.selectedDevices, {serial: deviceSerial}), 'floatingStatus', floatingStatusChanged.floatingStatus);
    _.set(_.find(this.selectedDevices, {serial: deviceSerial}), 'floatingSpeed', floatingStatusChanged.floatingSpeed);
  }

  selectDevices(){
    const dialogRef = this.dialog.open(DeviceSelectorDialogComponent, {restoreFocus: false, data: {devicesList: this.devicesList, roomName: this.room.roomName, selectedDevices: this.selectedDevices}});
    dialogRef.afterClosed().subscribe((dataFromChild) => {
      if (dataFromChild != null) {
        this.selectedDevices = dataFromChild;
      }
    });
  }

  finalStep(stepper: MatStepper){
    if (this.selectedDevices.length !== 0){
      stepper.next();
    }
  }

  createScenery(){
    console.log('logo: ', this.selectedLogo.id);
    this.sceneryService.addScenery(this.sceneryName, this.selectedLogo.path, this.room.id, this.selectedDevices);
  }

}
