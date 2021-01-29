import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import iro from "@jaames/iro";


export interface DialogData {
  name: string;
  hsv: Array<number>;
  img: string;
}

@Component({
  selector: 'app-scenes-details',
  templateUrl: './scenes-details.component.html',
  styleUrls: ['./scenes-details.component.css']
})
export class ScenesDetailsComponent implements OnInit {

  name: string;
  hsv: Array<number>;
  rgb: any;
  colorPicker: iro.Color;
  img: string;
  src: string;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData) {
    this.name = data.name;
    this.hsv = data.hsv;
    this.img = data.img;
    this.src = 'assets/svg/scenes/' + this.img;
  }

  ngOnInit(): void {
    this.rgb = "rgb(" + this.hsvToRgb(this.hsv[0], this.hsv[1], this.hsv[2]) + ")";

    console.log(this.src);
  }


  hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if (s == 0) {
      // Achromatic (grey)
      r = g = b = v;
      return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
      ];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;

      case 1:
        r = q;
        g = v;
        b = p;
        break;

      case 2:
        r = p;
        g = v;
        b = t;
        break;

      case 3:
        r = p;
        g = q;
        b = v;
        break;

      case 4:
        r = t;
        g = p;
        b = v;
        break;

      default: // case 5:
        r = v;
        g = p;
        b = q;
    }

    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  }

}
