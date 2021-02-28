import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-light-bulb-mock',
  templateUrl: './light-bulb-button-mock.component.html',
  styleUrls: ['./light-bulb-button-mock.component.css']
})
export class LightBulbButtonMockComponent implements OnInit {
  @Input() name: string;
  toggle = true;
  img = 'assets/svg/lights/light_on.svg';
  disableClick = false;

  constructor() { }

  ngOnInit(): void {
  }

  enableDisableRule(): void {
    this.toggle = !this.toggle;
    this.img = this.toggle ? 'assets/svg/lights/light_on.svg' : 'assets/svg/lights/light_off.svg';
  }

}
