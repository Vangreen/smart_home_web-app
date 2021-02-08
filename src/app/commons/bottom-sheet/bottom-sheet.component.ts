import {Component, Inject, Injectable, OnInit, Output} from '@angular/core';
import {FirstScreenComponent} from '../../first-screen/first-screen.component';
import {MatDialog} from '@angular/material/dialog';
import {AddRoomDialogComponent} from '../../add-room-dialog/add-room-dialog.component';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from '@angular/material/bottom-sheet';
import {RoomConfiguration} from '../../models/RoomConfiguration';
import {RoomService} from '../../service/room.service';

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
    private _bottomSheet: MatBottomSheet,
    private roomService: RoomService) {
  }
  rooms = this.data.roomsList;


  ngOnInit(): void {
  }

  setRoom(value: string): void {
    this.firstScreen.setRoom(value);
  }

  openAddRoomDialog() {
    this.dialog.open(AddRoomDialogComponent, {restoreFocus: false});
  }

  deleteRoom(id: number){
    this.roomService.deleteRoom(id);
  }

  closeBottomSheet(){
    this._bottomSheet.dismiss();
  }

}

