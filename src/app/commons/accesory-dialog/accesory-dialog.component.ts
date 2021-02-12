import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {UnassignedDevice} from '../../models/UnassignedDevice';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../snack-bar/snackbar.service';
import {DeviceService} from '../../service/device.service';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {RoomConfiguration} from '../../models/RoomConfiguration';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  roomsList: Array<RoomConfiguration>;
}

@Component({
  selector: 'app-accesory-dialog',
  templateUrl: './accesory-dialog.component.html',
  styleUrls: ['./accesory-dialog.component.css']
})
export class AccesoryDialogComponent implements OnInit {
  Buttons: Array<UnassignedDevice>;
  src: string;
  name = null;
  room = null;
  selectedRoom: RoomConfiguration;
  roomsList: Array<RoomConfiguration>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: ApiService,
    private _formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private deviceService: DeviceService
  ) {
    this.src = 'assets/svg/lights/light_on.svg';
    this.roomsList = data.roomsList;
  }

  ngOnInit(): void {
    this.deviceService
      .unassignedDevicesConfig()
      .pipe(map(unassignedDevice => this.connect_callback(unassignedDevice)), takeUntil(this.unsubscribeSubject))
      .subscribe();
    this.firstFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdFormGroup: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  connect_callback(message) {
    this.Buttons = message;
  }

  onOkClick(device: UnassignedDevice): void {
    this.apiService.addDevice(device.serial, device.deviceType, this.name, this.selectedRoom.id);
    this.snackBarService.openSnackBar('Urządzenie dodano');
  }
}
