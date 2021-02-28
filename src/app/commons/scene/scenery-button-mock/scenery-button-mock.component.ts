import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-scenery-button-mock',
  templateUrl: './scenery-button-mock.component.html',
  styleUrls: ['./scenery-button-mock.component.css']
})
export class SceneryButtonMockComponent implements OnInit {
  @Input() sceneryName: string;
  @Input() logo: string;
  toggle = true;
  disableClick = false;

  constructor() { }

  ngOnInit(): void {
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
  }

}
