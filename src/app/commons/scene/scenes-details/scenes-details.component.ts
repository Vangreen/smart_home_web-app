import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from '@angular/material/bottom-sheet';
import iro from '@jaames/iro';
import {SceneryService} from '../../../service/scenery.service';
import {SceneryConfiguration} from '../../../models/SceneryConfiguration';
import {SnackbarService} from '../../snack-bar/snackbar.service';
import {FirstScreenComponent} from '../../../first-screen/first-screen.component';


export interface DialogData {
  sceneryConfig: SceneryConfiguration;
}

@Component({
  selector: 'app-scenes-details',
  templateUrl: './scenes-details.component.html',
  styleUrls: ['./scenes-details.component.css']
})
export class ScenesDetailsComponent implements OnInit {
  sceneryConfiguration: SceneryConfiguration;
  rgb: any;
  colorPicker: iro.Color;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
              private sceneryService: SceneryService,
              private _bottomSheet: MatBottomSheet,
              private snackBarService: SnackbarService
  ) {
    this.sceneryConfiguration = data.sceneryConfig;
  }

  ngOnInit(): void {

  }

  onDeleteClick(){
    this.sceneryService.deleteScenery(this.sceneryConfiguration.id).subscribe();
    this._bottomSheet.dismiss();
    this.snackBarService.openSnackBar('Sceneria usunięta');
  }
}
