import {Component, Inject, Input, OnInit} from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {ColorEvent} from 'ngx-color';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";

export interface DialogData {
  url: string;
  state: string;
}

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  @Input() url: string;
  state: string;
  subject;
  butHue: number;
  message: string;
  colors: string[];

  // lightBulbService: LightBulbButtonComponent;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData) {
    this.url = data.url;
    this.state = data.state;
    // color palete
    this.colors = ['#FFFFFF', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']
    this.subject = webSocket({
      url: this.url
    });

  }

  ngOnInit(): void {
    console.log(this.url);
    console.log(this.state);
  }

  changeColor($event: ColorEvent): void {
    console.log(Math.round($event.color.hsv.h));
    this.butHue = Math.round($event.color.hsv.h);
    let brightnessLoc = 50;
    let sat = 100;
    this.subject.subscribe();
    if (this.butHue === 69) {
      brightnessLoc = 100;
      sat = 0;
    }
    const message = {
      task: 'color change',
      state: this.state,
      hue: this.butHue,
      saturation: sat,
      brightness: brightnessLoc
    };
    this.subject.next(message);
    this.subject.complete();
  }

  changeColorCircle($event: string): void {
    console.log($event);

    // // this.butHue = Math.round( $event.color.hsv.h);
    // let brightnessLoc = 50;
    // let sat = 100;
    // this.subject.subscribe();
    // if (this.butHue === 69) {
    //   brightnessLoc = 100;
    //   sat = 0;
    // }
    // const message = {
    //   task: 'color change',
    //   state: this.state,
    //   hue: this.butHue,
    //   saturation: sat,
    //   brightness: brightnessLoc
    // };
    // this.subject.next(message);
    // this.subject.complete();
  }


}
