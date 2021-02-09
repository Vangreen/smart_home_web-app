import {Component, Injectable, OnInit} from '@angular/core';
import {BottomSheetComponent} from '../commons/bottom-sheet/bottom-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ApiService} from '../service/api.service';
import {DeviceConfiguration} from '../models/DeviceConfiguration';
import {MatDialog} from '@angular/material/dialog';
import {SceneDialogComponent} from '../commons/scene-dialog/scene-dialog.component';
import {AccesoryDialogComponent} from '../commons/accesory-dialog/accesory-dialog.component';
import {RoomService} from '../service/room.service';
import {map} from 'rxjs/operators';
import {RoomConfiguration} from '../models/RoomConfiguration';

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
  Buttons: Array<DeviceConfiguration>;
  roomsList: Array<RoomConfiguration>;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private apiService: ApiService,
    public dialog: MatDialog,
    private roomService: RoomService
  ) {
      this.room = null;
  }

  ngOnInit(): void {
    this.roomService
      .roomConf()
      .pipe(map(roomConf => this.roomsListChange(roomConf)))
      .subscribe();
  }

  roomsListChange(roomsList: Array<RoomConfiguration>){
    this.roomsList = roomsList;
    if(this.room === null){
      const main = roomsList.find(ele => ele.main === 'yes');
      this.room = main.roomName;
      this.apiHandler();
    }
  }

  public apiHandler() {
    this.apiService.getDevices(this.room).subscribe((data: Array<DeviceConfiguration>) => {
      console.log(data);
      this.Buttons = data;
    });
  }

  setRoom(value: string): void {
    this._bottomSheet.dismiss(value);
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }


  openSceneDialog() {
    const dialogRef = this.dialog.open(SceneDialogComponent, {restoreFocus: false});

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());

  }

  openAccessoryDialog() {
    const dialogRef = this.dialog.open(AccesoryDialogComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(data =>
      this.apiHandler()
    );
    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());

  }


  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent, {
      data: {roomsList: this.roomsList}
    });
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      if (dataFromChild != null) {
        this.room = dataFromChild;
        this.apiHandler();
      }
    });
  }
}
