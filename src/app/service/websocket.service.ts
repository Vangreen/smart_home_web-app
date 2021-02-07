import {Injectable, OnDestroy} from '@angular/core';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import * as SockJS from 'sockjs-client';
import { filter, first, switchMap } from 'rxjs/operators';

export enum SocketClientState {
  ATTEMPTING, CONNECTED
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy{
  client;
  state: BehaviorSubject<SocketClientState>;
  subscription;
  constructor()
   {
     this.client = new Client({
       brokerURL: environment.websocketURL,
       connectHeaders: {
         login: 'user',
         passcode: 'password',
       },
       debug: function (str) {
         console.log(str);
       },
       reconnectDelay: 5000,
       heartbeatIncoming: 4000,
       heartbeatOutgoing: 4000,
     });
     this.client.activate();
     this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
     this.client.onConnect = (frame) => {
       console.log('frame: ', frame);
       this.state.next(SocketClientState.CONNECTED);
     };
   }

  connect(): Observable<Client> {
    return new Observable<Client>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      });
    });
  }

  onMessage(topic: string): Observable<any> {
    return this.connect().pipe(first(), switchMap(client => {
      return new Observable<any>(observer => {
        const subscription: StompSubscription = client.subscribe(topic, message => {
          observer.next(JSON.parse(message.body));
        });
        return () => subscription.unsubscribe();
      });
    }));
  }

  ngOnDestroy() {
    this.connect().pipe(first()).subscribe(client => client.deactivate());
  }

  send(topic: string, payload: any): void {
    this.connect()
      .pipe(first())
      .subscribe(inst => inst.publish({destination: topic, body: JSON.stringify(payload)}));
  }


}
