import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public stompClient;
  public subscription;
  constructor() { }

  subscribe(path, callback) {
    const serverUrl = environment.serverURL + '/mywebsocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, (frame) => {
      that.subscription = that.stompClient.subscribe(path, callback);
    });
  }

  sendMessage(path: string, message: any): void {
    this.stompClient.send(path, {}, message);
  }

  unsubscribe(){
    this.subscription.unsubscribe();
  }

}
