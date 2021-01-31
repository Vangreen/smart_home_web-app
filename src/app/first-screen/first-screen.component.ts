import {Component, Injectable, OnInit} from '@angular/core';
import {BottomSheetComponent} from "../commons/bottom-sheet/bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import { ApiService } from '../service/api.service';
import {DeviceConfiguration} from '../models/DeviceConfiguration';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class FirstScreenComponent implements OnInit {

  room: string;
  biurko = 'ws://192.168.0.25:81';
  biurkoHsv = [0, 0, 100];
  parapet = 'ws://192.168.2.125:81';
  Buttons: Array<DeviceConfiguration>;
  constructor(private _bottomSheet: MatBottomSheet, private apiService: ApiService) {
    this.room = 'Salon';
    this.apiService.getDevices().subscribe((data: Array<DeviceConfiguration>) => {
      console.log(data);
      this.Buttons = data;
    });
  }

  ngOnInit(): void {

  }

  setRoom(value: string): void {
    this._bottomSheet.dismiss(value);
  }


  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      if (dataFromChild != null) {
        this.room = dataFromChild;
      }
    });
  }
}
