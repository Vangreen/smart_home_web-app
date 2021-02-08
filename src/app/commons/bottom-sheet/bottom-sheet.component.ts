import {Component, Injectable, OnInit} from '@angular/core';
import {FirstScreenComponent} from "../../first-screen/first-screen.component";

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class BottomSheetComponent implements OnInit {

  rooms: string[] = ['pawla', 'Kuchnia', 'Sypialnia'];


  constructor(private firstScreen: FirstScreenComponent) {
  }

  ngOnInit(): void {
  }

  setRoom(value: string): void {
    this.firstScreen.setRoom(value)
  }

}

