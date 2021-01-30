import {Component, Input, OnInit} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {Router} from '@angular/router';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
// import {ColorPickerComponent} from "../color-picker/color-picker.component"
import {ScenesDetailsComponent} from "../scenes-details/scenes-details.component";

@Component({
  selector: 'app-scenes-button',
  templateUrl: './scenes-button.component.html',
  styleUrls: ['./scenes-button.component.css']
})
export class ScenesButtonComponent implements OnInit {

  constructor(private router: Router, private _bottomSheet: MatBottomSheet) {
  }

  @Input() url: string;
  @Input() name: string;
  @Input() hsv: Array<number>;
  @Input() imgName: string;
  toggle = true;
  status = 'On';
  img: string;
  subject;
  disableClick = false;
  connectionStatus = 'Loading';

  ngOnInit(): void {
    console.log("HUEEEEEEEE");
    this.img = 'assets/svg/scenes/' + this.imgName;
    this.subject = webSocket({
      url: this.url
    });
    this.subject.subscribe(
      msg => {
        if (msg.task === 'state change' || msg.response === 'connected') {
          this.connectionStatus = '';
          if (msg.state === 'On' && this.arrayEquals(this.hsv, [msg.hue, msg.saturation, msg.brightness])) {
            console.log("on");
            // this.toggleButton();
            this.toggle = true;
          } else if (msg.state === 'Off') {
            console.log("off");
            // this.toggleButton();
            this.toggle = false;
          } else if (!this.arrayEquals(this.hsv, [msg.hue, msg.saturation, msg.brightness])) {
            console.log("off");
            // this.toggleButton();
            this.toggle = false;
          }
        } else if (msg.task === 'color change') {
          console.log("ALFAAAAA");

          if (msg.state === 'On' && this.arrayEquals(this.hsv, [msg.hue, msg.saturation, msg.brightness])) {
            console.log("on -color");
            console.log(this.arrayEquals(this.hsv, [msg.hue, msg.saturation, msg.brightness]));
            // this.toggleButton();
            this.toggle = true;
          } else if (msg.state === 'Off') {
            console.log("off");
            // this.toggleButton();
            this.toggle = false;
          } else if (!this.arrayEquals(this.hsv, [msg.hue, msg.saturation, msg.brightness])) {
            console.log("off");
            // this.toggleButton();
            this.toggle = false;
          }
          // this.hsv = [msg.hue, msg.saturation, msg.brightness];
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

  arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  toggleButton() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
    // this.img = this.toggle ? 'assets/svg/light_on.svg' : 'assets/svg/light_off.svg';
  }

  getStatus() {
    return this.status;
  }

  enableDisableRule() {
    console.log("ENABLE DISABLE")
    if(this.status === 'On'){
      console.log("detect on off")
      const message = {
        task: 'state change',
        state: 'On',
        hue: this.hsv[0],
        saturation: this.hsv[1],
        brightness: this.hsv[2]
      };
      this.subject.next(message);
    }
    // this.toggleButton();
    const message = {
      task: 'color change',
      state: this.status,
      hue: this.hsv[0],
      saturation: this.hsv[1],
      brightness: this.hsv[2]
    };
    this.subject.next(message);
  }

  onLongPress() {
    this._bottomSheet.open(ScenesDetailsComponent, {
      data: {name: this.name, hsv: this.hsv, img: this.imgName}
    });
  }

}
