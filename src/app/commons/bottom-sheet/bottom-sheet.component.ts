import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {FirstScreenComponent} from '../../first-screen/first-screen.component';
import {MatDialog} from '@angular/material/dialog';
import {AddRoomDialogComponent} from '../dialogs/add-room-dialog/add-room-dialog.component';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from '@angular/material/bottom-sheet';
import {RoomConfiguration} from '../../models/RoomConfiguration';
import {AdvancedOptionRoomDialogComponent} from '../dialogs/advanced-option-room-dialog/advanced-option-room-dialog.component';

export interface DialogData {
  roomsList: Array<RoomConfiguration>;
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class BottomSheetComponent implements OnInit {


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
    private firstScreen: FirstScreenComponent,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) {
  }

  rooms = this.data.roomsList;


  ngOnInit(): void {
  }

  setRoom(room: RoomConfiguration): void {
    this.firstScreen.setRoom(room);
  }

  openAddRoomDialog() {
    this.dialog.open(AddRoomDialogComponent, {restoreFocus: false});
    this.firstScreen.closeBottomSheet();
  }

  openAdvancedOptionsDialog() {
    this.dialog.open(AdvancedOptionRoomDialogComponent, {data: {roomsList: this.rooms}});
    this.firstScreen.closeBottomSheet();
  }

}

