import {Component, Injectable, OnInit, Output} from '@angular/core';
import {FirstScreenComponent} from "../../first-screen/first-screen.component";
import {MatDialog} from "@angular/material/dialog";
import {AddRoomDialogComponent} from "../../add-room-dialog/add-room-dialog.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class BottomSheetComponent implements OnInit {

  rooms: string[] = ['pawla', 'Kuchnia', 'Sypialnia'];

  constructor(
    private firstScreen: FirstScreenComponent,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
  }

  setRoom(value: string): void {
    this.firstScreen.setRoom(value)
  }

  openAddRoomDialog() {
    this.dialog.open(AddRoomDialogComponent, {restoreFocus: false});
  }

  closeBottomSheet(){
    this._bottomSheet.dismiss();
  }

}

