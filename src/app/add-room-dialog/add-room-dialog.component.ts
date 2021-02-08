import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.css']
})
export class AddRoomDialogComponent implements OnInit {

  checked = false;
  roomName: string;

  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
  }

  onAddButtonClick() {
  }

}
