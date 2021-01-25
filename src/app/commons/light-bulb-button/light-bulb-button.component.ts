import {Component, Input, OnInit} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-light-bulb-button',
  templateUrl: './light-bulb-button.component.html',
  styleUrls: ['./light-bulb-button.component.css']
})
export class LightBulbButtonComponent implements OnInit {

  constructor(private router: Router) {
  }
  @Input() url: string;
  @Input() name: string;
  toggle = true;
  status = 'On';
  img = 'assets/svg/light_on.svg';
  subject;
  disableClick = false;
  connectionStatus = 'Loading';
  ngOnInit(): void {
    this.subject = webSocket({
      url: this.url
    });
    this.subject.subscribe(
      msg => {
        console.log('message received: ' + JSON.stringify(msg));
        if (msg.task === 'state change' || msg.response === 'connected'){
          this.connectionStatus = '';
          if (msg.state === 'On' && !this.toggle){
            this.toggleButton();
          }else if (msg.state === 'Off' && this.toggle){
            this.toggleButton();
          }
        }
      }, // Called whenever there is a message from the server.
      err => {
        console.log(err);
        this.connectionStatus = 'Couldnt connect';
        this.disableClick = true;
      }, // Called if at any point WebSocket API signals some kind of error.
      () => {
        console.log('complete');
        this.connectionStatus = 'disconnected';
        this.disableClick = true;
      } // Called when connection is closed (for whatever reason).
    );
  }
  toggleButton() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
    this.img = this.toggle ? 'assets/svg/light_on.svg' : 'assets/svg/light_off.svg';
  }

  enableDisableRule() {
    this.toggleButton();
    const message = {
      task: 'state change',
      state: this.status
    };
    this.subject.next(message);
  }

  onLongPress() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        state: this.status,
        url: this.url
      }
    };
    this.router.navigate(['color-pick'], navigationExtras);
  }
}
