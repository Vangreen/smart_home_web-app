import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ColorPickerComponent} from '../color-picker/color-picker.component';
import {FirstScreenComponent} from '../../first-screen/first-screen.component';
import {DeviceService} from '../../service/device.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-light-bulb-button',
  templateUrl: './light-bulb-button.component.html',
  styleUrls: ['./light-bulb-button.component.css']
})
export class LightBulbButtonComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private firstScreen: FirstScreenComponent,
    private deviceService: DeviceService
  ) {
  }
  public msg = [];
  @Input() serial: number;
  @Input() name: string;
  @Input() hsv: Array<number>;
  @Input() status: string;
  toggle = true;
  img = 'assets/svg/lights/light_on.svg';
  disableClick = false;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    if (this.status === 'Off') {
      this.toggleButton();
    }
    this.deviceService
      .deviceConf(this.serial)
      .pipe(map(deviceConfig => this.connect_callback(deviceConfig)), takeUntil(this.unsubscribeSubject))
      .subscribe();
  }

  ngOnDestroy(){
    console.log('destroyed');
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }


  connect_callback(message) {
    console.log(message);
    if (message){
      this.msg.push(message);
      if (message.task === 'status change' && message.status !== this.status) {
        this.toggleButton();
      } else if (message.task === 'color change') {
        this.hsv = [message.hue, message.saturation, message.brightness];
      } else if (message.hue !== undefined) {                                  // temp
        if (message.deviceStatus === 'On' && !this.toggle) {
          this.toggleButton();
        } else if (message.deviceStatus === 'Off' && this.toggle) {
          this.toggleButton();
        }
        this.hsv = [message.hue, message.saturation, message.brightness];
      }
    }

  };

  toggleButton(): void {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
    this.img = this.toggle ? 'assets/svg/lights/light_on.svg' : 'assets/svg/lights/light_off.svg';
  }

  getStatus(): string {
    return this.status;
  }

  enableDisableRule(): void {
    this.toggleButton();
    const message = {
      status: this.status
    };
    this.deviceService.changeDeviceStatus(this.serial, message);
  }

  onLongPress(): void {
    const bottomSheet = this._bottomSheet.open(ColorPickerComponent, {
      data: {status: this.status, hsv: this.hsv, serial: this.serial}
    });
    bottomSheet.afterDismissed().subscribe(data =>
      this.firstScreen.apiHandler()
    );
  }
}
