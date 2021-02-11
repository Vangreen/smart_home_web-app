import {Component, Inject, OnInit} from '@angular/core';
import {RoomConfiguration} from "../../models/RoomConfiguration";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {RoomService} from "../../service/room.service";

var _ = require('lodash');

export interface DialogData {
  roomsList: Array<RoomConfiguration>;
}


@Component({
  selector: 'app-advanced-option-room-dialog',
  templateUrl: './advanced-option-room-dialog.component.html',
  styleUrls: ['./advanced-option-room-dialog.component.css']
})
export class AdvancedOptionRoomDialogComponent implements OnInit {

  roomsList: Array<RoomConfiguration>;
  room: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private roomService: RoomService, public dialog: MatDialog) {

  }
  displayedColumns: string[] = ['room', 'delete'];
  ngOnInit(): void {
    this.roomsList = this.data.roomsList;
    console.log(this.roomsList);
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id);
    this.roomsList = _.reject(this.roomsList, function(room) { return room.id === id; });
  }

  renameRoom(id: number, name: string){
    this.roomService.renameRoom(id,name);
  }

}
