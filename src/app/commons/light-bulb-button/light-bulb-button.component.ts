import {Component, Input, OnInit} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {Router} from '@angular/router';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ColorPickerComponent} from "../color-picker/color-picker.component"

@Component({
  selector: 'app-light-bulb-button',
  templateUrl: './light-bulb-button.component.html',
  styleUrls: ['./light-bulb-button.component.css']
})
export class LightBulbButtonComponent implements OnInit {

  constructor(private router: Router, private _bottomSheet: MatBottomSheet) {
  }

  @Input() url: string;
  @Input() name: string;
  @Input() hsv: Array<number>;
  toggle = true;
  status = 'On';
  img = 'assets/svg/lights/light_on.svg';
  subject;
  disableClick = false;
  connectionStatus = 'Loading';

  ngOnInit(): void {
    this.subject = webSocket({
      url: this.url
    });
    this.subject.subscribe(
      msg => {
        console.log('message received: ' + JSON.stringify(msg));
        if (msg.task === 'state change' || msg.response === 'connected') {
          this.connectionStatus = '';
          if (msg.state === 'On' && !this.toggle) {
            this.toggleButton();
          } else if (msg.state === 'Off' && this.toggle) {
            this.toggleButton();
          }
        } else if (msg.task === 'color change') {
          this.hsv = [msg.hue, msg.saturation, msg.brightness];
        }
      }, // Called whenever there is a message from the server.
      err => {
        console.log(err);
        this.connectionStatus = 'Couldnt connect';
        this.disableClick = true;
      }, // Called if at any point WebSocket API signals some kind of error.
      () => {
        console.log('complete');
        this.connectionStatus = 'disconnected';
        this.disableClick = true;
      } // Called when connection is closed (for whatever reason).
    );
  }

  toggleButton() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
    this.img = this.toggle ? 'assets/svg/lights/light_on.svg' : 'assets/svg/lights/light_off.svg';
  }

  getStatus() {
    return this.status;
  }

  enableDisableRule() {
    this.toggleButton();
    const message = {
      task: 'state change',
      state: this.status,
      hue: this.hsv[0],
      saturation: this.hsv[1],
      brightness: this.hsv[2]
    };
    this.subject.next(message);
  }

  onLongPress() {
    this._bottomSheet.open(ColorPickerComponent, {
      data: {url: this.url, state: this.status, hsv: this.hsv}
    });
  }
}
