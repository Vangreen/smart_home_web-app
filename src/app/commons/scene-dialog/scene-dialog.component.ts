import {Component, Inject, OnInit} from '@angular/core';
import {DeviceConfiguration} from '../../models/DeviceConfiguration';
import {UnassignedDevice} from '../../models/UnassignedDevice';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AccesoryDialogComponent} from '../accesory-dialog/accesory-dialog.component';
import {DeviceSelectorDialogComponent} from '../device-selector-dialog/device-selector-dialog.component';



export interface DialogData {
  devicesList: Array<DeviceConfiguration>;
  roomName: string;
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
  roomName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {
    this.devicesList = data.devicesList;
    this.roomName = data.roomName;
    this.selectedDevices = [];
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  selectDevices(){
    const dialogRef = this.dialog.open(DeviceSelectorDialogComponent, {restoreFocus: false, data: {devicesList: this.devicesList, roomName: this.roomName, selectedDevices: this.selectedDevices}});
    dialogRef.afterClosed().subscribe((dataFromChild) => {
      if (dataFromChild != null) {
        this.selectedDevices = dataFromChild;
      }
    });
  }

}
