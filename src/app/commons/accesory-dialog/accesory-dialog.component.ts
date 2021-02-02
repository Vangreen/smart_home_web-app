import {Component, OnInit} from '@angular/core';
import {DeviceConfiguration} from "../../models/DeviceConfiguration";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-accesory-dialog',
  templateUrl: './accesory-dialog.component.html',
  styleUrls: ['./accesory-dialog.component.css']
})
export class AccesoryDialogComponent implements OnInit {
  Buttons: Array<DeviceConfiguration>;
  src: string;

  constructor(private apiService: ApiService) {
    this.src = 'assets/svg/lights/light_on.svg'
    this.apiService.getDevices().subscribe((data: Array<DeviceConfiguration>) => {
      console.log(data);
      this.Buttons = data;
    });
  }

  ngOnInit(): void {
  }

  onOkClick(device: DeviceConfiguration): void{
    console.log(device.serial.toString());
    this.apiService.setAdded(device.serial.toString());
  }

}
