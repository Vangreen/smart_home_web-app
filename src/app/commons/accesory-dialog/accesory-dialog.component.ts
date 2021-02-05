import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {UnassignedDevice} from '../../models/UnassignedDevice';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../snack-bar/snackbar.service';
import {WebsocketService} from '../../service/websocket.service';



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

  constructor(
    private apiService: ApiService,
    private _formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private webSocket: WebsocketService
  ) {
    this.src = 'assets/svg/lights/light_on.svg';
  }

  ngOnInit(): void {
    this.webSocket.subscribe('/device/unassignedDevices', this.connect_callback);
    this.firstFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  
  ngOnDestroy(): void {
    this.webSocket.unsubscribe();
  }

  connect_callback = (message) => {
    this.Buttons = JSON.parse(message.body);
  }

  onOkClick(device: UnassignedDevice): void {
      console.log(device.serial.toString());
      this.apiService.addDevice(device.serial, device.deviceType, this.name, this.room);
      this.snackBarService.openSnackBar('Urządzenie dodano');
  }

}
