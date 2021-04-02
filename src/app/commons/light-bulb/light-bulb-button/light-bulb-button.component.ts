import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ColorPickerComponent} from '../../color-picker/color-picker.component';
import {FirstScreenComponent} from '../../../first-screen/first-screen.component';
import {DeviceService} from '../../../service/device.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ColorPickerSceneriesComponent} from '../../color-picker-sceneries/color-picker-sceneries.component';
import {DeviceConfiguration} from '../../../models/DeviceConfiguration';
import FloatingStatusChange from '../../../models/FloatingStatusChange';


@Component({
  selector: 'app-light-bulb-button',
  templateUrl: './light-bulb-button.component.html',
  styleUrls: ['./light-bulb-button.component.css']
})
export class LightBulbButtonComponent implements OnInit, OnDestroy {
  @Input() configuration: DeviceConfiguration;
  hsv: Array<number>;
  @Input() scenery: boolean;
  @Output() hsvChange: EventEmitter<Array<number>> = new EventEmitter();
  @Output() statusChange: EventEmitter<string> = new EventEmitter();
  @Output() floatingChange: EventEmitter<FloatingStatusChange> = new EventEmitter();

  constructor(
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private firstScreen: FirstScreenComponent,
    private deviceService: DeviceService,
    public dialog: MatDialog
  ) {
  }

  public msg = [];

  toggle = true;
  img = 'assets/svg/lights/light_on.svg';
  disableClick = false;
  floating = false;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.hsv = [this.configuration.hue, this.configuration.saturation, this.configuration.brightness];
    if (this.configuration.serial !== undefined) {
      if (this.configuration.deviceStatus === 'Off') {
        this.toggleButton();
      }
      if (this.configuration.floatingStatus === 'On'){
        this.floating = true;
      }
      this.deviceService
        .deviceConf(this.configuration.serial)
        .pipe(map(deviceConfig => this.connect_callback(deviceConfig)), takeUntil(this.unsubscribeSubject))
        .subscribe();
    }
  }

  ngOnDestroy() {
    console.log('destroyed');
    if (this.configuration.serial !== undefined) {
      this.unsubscribeSubject.next();
      this.unsubscribeSubject.complete();
    }
  }


  connect_callback(message) {
    console.log(message);
    if (message) {
      this.msg.push(message);
      if (message.task === 'status change') {
        if (message.status !== this.configuration.deviceStatus){
          this.toggleButton();
        }
        this.updateLocalStatus(message);
        this.emitData(this.floatingChange, new FloatingStatusChange(message));
      } else if (message.task === 'color change') {
        this.updateLocalHSV(message);
        this.emitData(this.hsvChange, this.hsv);
        if (message.status === 'On' && !this.toggle) {
          this.toggleButton();
        } else if (message.status === 'Off' && this.toggle) {
          this.toggleButton();
        }
        this.updateLocalStatus(message);
        this.emitData(this.floatingChange, new FloatingStatusChange(message));
      }
    }

  }

  updateLocalHSV(message: any){
    this.hsv = [message.hue, message.saturation, message.brightness];
    this.configuration.hue = message.hue;
    this.configuration.saturation = message.saturation;
    this.configuration.brightness = message.brightness;
  }

  updateLocalStatus(message: any){
    this.configuration.deviceStatus = message.status;
    this.configuration.floatingStatus = message.floatingStatus;
    this.configuration.floatingSpeed = message.floatingSpeed;
  }

  toggleButton(): void {
    this.toggle = !this.toggle;
    this.configuration.deviceStatus = this.toggle ? 'On' : 'Off';
    this.img = this.toggle ? 'assets/svg/lights/light_on.svg' : 'assets/svg/lights/light_off.svg';
    this.emitData(this.statusChange, this.configuration.deviceStatus);
  }

  emitData(emitter: EventEmitter<any>, data: any): void {
    if (this.scenery) {
      emitter.emit(data);
    }
  }

  getStatus(): string {
    return this.configuration.deviceStatus;
  }

  enableDisableRule(): void {
    this.toggleButton();
    if (this.configuration.serial !== undefined) {
      const message = {
        status: this.configuration.deviceStatus,
        floatingStatus: this.configuration.floatingStatus,
        floatingSpeed: this.configuration.floatingSpeed
      };
      this.deviceService.changeDeviceStatus(this.configuration.serial, message);
    }
  }

  onLongPress(): void {
    if (this.configuration.serial !== undefined && this.scenery === false) {

      const bottomSheet = this._bottomSheet.open(ColorPickerComponent, {
        data: {deviceConfiguration: this.configuration}
        // data: {status: this.configuration.deviceStatus, hsv: this.hsv, serial: this.configuration.serial}
      });
      bottomSheet.afterDismissed().subscribe(data =>
        this.firstScreen.apiHandler()
      );
    } else if (this.configuration.serial !== undefined && this.scenery !== undefined) {
      const dialogRef = this.dialog.open(ColorPickerSceneriesComponent, {
        restoreFocus: false,
        data: {deviceConfiguration: this.configuration}
      });
    }
  }
}
