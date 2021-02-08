import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {UnassignedDevice} from '../../models/UnassignedDevice';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../snack-bar/snackbar.service';
import {DeviceService} from '../../service/device.service';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';



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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private _formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private deviceService: DeviceService
  ) {
    this.src = 'assets/svg/lights/light_on.svg';
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
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  connect_callback(message){
      this.Buttons = message;
  }

  onOkClick(device: UnassignedDevice): void {
      console.log(device.serial.toString());
      this.apiService.addDevice(device.serial, device.deviceType, this.name, this.room);
      this.snackBarService.openSnackBar('Urządzenie dodano');
  }

}
