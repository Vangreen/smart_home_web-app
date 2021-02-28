import {Component, Input, OnInit} from '@angular/core';
import {DeviceConfiguration} from '../../../models/DeviceConfiguration';
import {DeviceSelectorDialogComponent} from '../../dialogs/device-selector-dialog/device-selector-dialog.component';

@Component({
  selector: 'app-light-bulb-select-button',
  templateUrl: './light-bulb-select-button.component.html',
  styleUrls: ['./light-bulb-select-button.component.css']
})
export class LightBulbSelectButtonComponent implements OnInit {
  img = 'assets/svg/lights/light_on.svg';
  constructor(
    private deviceSelector: DeviceSelectorDialogComponent
  ) { }

  @Input() device: DeviceConfiguration;
  @Input() toggle: boolean;

  ngOnInit(): void {
    console.log('select: ', this.toggle);
  }

  selectUnselectRule(){
    // this.toggleButton();
    if (this.toggle){
      this.deviceSelector.deleteSelectedDevice(this.device);
    }else if (!this.toggle){
      this.deviceSelector.addSelectedDevice(this.device);
    }
    this.toggle = !this.toggle;

  }

  // toggleButton(): void {
  //
  //   // this.img = this.toggle ? 'assets/svg/lights/light_on.svg' : 'assets/svg/lights/light_off.svg';
  // }

}
