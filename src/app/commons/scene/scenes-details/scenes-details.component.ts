import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import iro from '@jaames/iro';


export interface DialogData {
  name: string;
  img: string;
}

@Component({
  selector: 'app-scenes-details',
  templateUrl: './scenes-details.component.html',
  styleUrls: ['./scenes-details.component.css']
})
export class ScenesDetailsComponent implements OnInit {

  name: string;
  rgb: any;
  colorPicker: iro.Color;
  img: string;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData) {
    this.name = data.name;
    this.img = data.img;
  }

  ngOnInit(): void {

  }

}
