import {Component, Injectable, OnInit} from '@angular/core';
import {BottomSheetComponent} from '../commons/bottom-sheet/bottom-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ApiService} from '../service/api.service';
import {DeviceConfiguration} from '../models/DeviceConfiguration';
import {MatDialog} from '@angular/material/dialog';
import {SceneDialogComponent} from '../commons/scene/scene-dialog/scene-dialog.component';
import {AccesoryDialogComponent} from '../commons/dialogs/accesory-dialog/accesory-dialog.component';
import {RoomService} from '../service/room.service';
import {map, takeUntil} from 'rxjs/operators';
import {RoomConfiguration} from '../models/RoomConfiguration';
import {SceneryService} from '../service/scenery.service';
import {SceneryConfiguration} from '../models/SceneryConfiguration';
import {Subject} from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class FirstScreenComponent implements OnInit {

  room: RoomConfiguration;
  Buttons: Array<DeviceConfiguration>;
  Sceneries: Array<SceneryConfiguration>;
  roomsList: Array<RoomConfiguration>;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private apiService: ApiService,
    public dialog: MatDialog,
    private roomService: RoomService,
    private sceneryService: SceneryService
  ) {
      this.room = null;
  }

  ngOnInit(): void {
    this.roomService
      .roomConf()
      .pipe(map(roomConf => this.roomsListChange(roomConf)))
      .subscribe();
  }

  roomChangeResubscribe(roomID: number){
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
    this.unsubscribeSubject = new Subject<void>();
    this.sceneryService
      .sceneriesList(roomID)
      .pipe(map(sceneriesList => this.sceneriesListChange(sceneriesList)), takeUntil(this.unsubscribeSubject))
      .subscribe();
  }

  sceneriesListChange(sceneriesList: Array<SceneryConfiguration>){
    console.log("sceneriesList: ", sceneriesList)
    this.Sceneries = sceneriesList;
  }

  roomsListChange(roomsList: Array<RoomConfiguration>){
    this.roomsList = roomsList;
    if (this.room == null){
      const main = roomsList.find(ele => ele.main === 'yes');
      if (main !== undefined){
        this.room = main;
      }else if (Object.keys(roomsList).length !== 0){
        this.room = roomsList[0];
      }else{
        this.room = null;
        this.Buttons = null;
      }
      this.apiHandler();
    }else{
      const newChosen = roomsList.find(ele => ele.id === this.room.id);
      if (newChosen.roomName !== this.room.roomName){
        this.room = newChosen;
      }
    }
    this.roomChangeResubscribe(this.room.id);
  }


  public apiHandler() {
    if (this.room != null){
      this.apiService.getDeviceByRoomID(this.room.id).subscribe((data: Array<DeviceConfiguration>) => {
        this.Buttons = data;
      });
    }
  }

  setRoom(room: RoomConfiguration): void {
    this._bottomSheet.dismiss(room);
  }

  statusChanged(status: string, deviceSerial: number){
    _.set(_.find(this.Buttons, {serial: deviceSerial}), 'deviceStatus', status);
  }

  hsvChanged(hsv: Array<number>, deviceSerial: number){
    console.log('hsv: ', hsv);
    _.set(_.find(this.Buttons, {serial: deviceSerial}), 'hue', hsv[0]);
    _.set(_.find(this.Buttons, {serial: deviceSerial}), 'saturation', hsv[1]);
    _.set(_.find(this.Buttons, {serial: deviceSerial}), 'brightness', hsv[2]);
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }


  openSceneDialog() {
    this.dialog.open(SceneDialogComponent, {restoreFocus: false, data: {devicesList: this.Buttons, room: this.room }});

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());

  }

  openAccessoryDialog() {
    const dialogRef = this.dialog.open(AccesoryDialogComponent, {restoreFocus: false, data: {roomsList: this.roomsList}});
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
        this.roomChangeResubscribe(this.room.id);
      }
    });
  }
}
