import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {DeviceService} from '../service/device.service';
import {RoomService} from '../service/room.service';

@Component({
  selector: 'app-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.css']
})
export class AddRoomDialogComponent implements OnInit {

  checked = false;
  roomName: string;
  main: string;
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private _bottomSheet: MatBottomSheet,
              private roomService: RoomService) {
  }

  ngOnInit(): void {
  }

  onAddButtonClick() {
    this.checked === false ? this.main = 'no' : this.main = 'yes';
    this.roomService.addRoom(this.roomName, this.main);
  }

}
