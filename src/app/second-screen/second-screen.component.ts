import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {webSocket} from 'rxjs/webSocket';


@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.css']
})
export class SecondScreenComponent implements OnInit {
  state: string;
  url: string;
  subject;
  constructor(private router: ActivatedRoute) {
    this.router.queryParams.subscribe(params => {
      this.state = params.state;
      this.url = params.url;
    });
    this.subject = webSocket({
      url: this.url
    });
  }

  ngOnInit(): void {
  }

  changeColor(butHue: number): void {
    let brightnessLoc = 50;
    let sat = 100;
    this.subject.subscribe();
    if (butHue === 69) {
      brightnessLoc = 100;
      sat = 0;
    }
    const message = {
      task: 'color change',
      state: this.state,
      hue: butHue,
      saturation: sat,
      brightness: brightnessLoc
    };
    this.subject.next(message);
    this.subject.complete();
  }

}
