import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ScenesDetailsComponent} from '../scenes-details/scenes-details.component';
import {SceneryConfiguration} from '../../models/SceneryConfiguration';
import {SceneryService} from '../../service/scenery.service';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-scenes-button',
  templateUrl: './scenes-button.component.html',
  styleUrls: ['./scenes-button.component.css']
})
export class ScenesButtonComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private _bottomSheet: MatBottomSheet,
              private sceneryService: SceneryService
  ) {
  }

  @Input() name: string;
  @Input() img: string;
  @Input() sceneryConfig: SceneryConfiguration;
  @Input() roomID: number;
  toggle = true;
  subject;
  disableClick = false;
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    if(this.sceneryConfig !== undefined){
      if (this.sceneryConfig.sceneryStatus === 'Off') {
        this.toggleButton();
      }
      this.sceneryService
        .sceneryConfiguration(this.roomID)
        .pipe(map(sceneConfig => this.connect_callback(sceneConfig)), takeUntil(this.unsubscribeSubject))
        .subscribe();
    }

  }

  ngOnDestroy(){
    console.log('destroyed');
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  connect_callback(message: SceneryConfiguration){
    console.log('message: ', message);
    if (message.id === this.sceneryConfig.id && message.sceneryStatus === 'On' && !this.toggle){
      this.toggleButton();
    }else if (message.id === this.sceneryConfig.id && message.sceneryStatus === 'Off' && this.toggle){
      this.toggleButton();
    }else if (message.id !== this.sceneryConfig.id && message.sceneryStatus === 'On' && this.toggle){
      this.toggleButton();
    }
  }

  toggleButton() {
    this.toggle = !this.toggle;
    this.sceneryConfig.sceneryStatus = this.toggle ? 'On' : 'Off';
  }

  enableDisableRule() {
    this.toggleButton();
    this.sceneryService.changeSceneryStatus(this.sceneryConfig);
  }

  onLongPress() {
    this._bottomSheet.open(ScenesDetailsComponent, {
      data: {name: this.sceneryConfig.sceneryName, img: this.sceneryConfig.logo}
    });
  }

}
