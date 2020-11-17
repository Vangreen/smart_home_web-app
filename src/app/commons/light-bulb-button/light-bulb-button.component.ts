import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-light-bulb-button',
  templateUrl: './light-bulb-button.component.html',
  styleUrls: ['./light-bulb-button.component.css']
})
export class LightBulbButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggle = true;
  status = 'On';
  img = 'assets/svg/light_on.svg';
  room = 'Salon'

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
    this.img = this.toggle ? 'assets/svg/light_on.svg' : 'assets/svg/light_off.svg';
  }

}
