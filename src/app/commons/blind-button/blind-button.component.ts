import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blind-button',
  templateUrl: './blind-button.component.html',
  styleUrls: ['./blind-button.component.css']
})
export class BlindButtonComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = true;
  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
