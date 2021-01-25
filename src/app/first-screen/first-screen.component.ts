import {Component, Injectable, OnInit} from '@angular/core';
import {BottomSheetComponent} from "../commons/bottom-sheet/bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

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
  biurko = 'ws://192.168.2.145:81';
  parapet = 'ws://192.168.2.125:81';
  constructor(private _bottomSheet: MatBottomSheet) {
    this.room = 'Salon';
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
