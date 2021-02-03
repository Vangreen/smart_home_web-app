import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {UnassignedDevice} from '../../models/UnassignedDevice';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var SockJS;
declare var Stomp;

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
  public stompClient;
  public msg = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;

  constructor(private apiService: ApiService, private _formBuilder: FormBuilder) {
    this.src = 'assets/svg/lights/light_on.svg';
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  initializeWebSocketConnection() {
    const serverUrl = environment.serverURL + '/mywebsocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/device/unassignedDevices', (message) => {
        if (message.body) {
          that.msg.push(message.body);
          that.Buttons = JSON.parse(message.body);
        }
      });
    });
  }


  onOkClick(device: UnassignedDevice): void {
    if (this.name !== null && this.room !== null) {
      console.log(device.serial.toString());
      this.apiService.addDevice(device.serial, device.deviceType, this.name, this.room);
    } else {
      console.log('null');
    }
  }

}
