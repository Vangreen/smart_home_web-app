import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {WebsocketService} from './websocket.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient,
              private websocket: WebsocketService) { }

  public addRoom(roomName: string, main: string){
    const message = {
      roomName: roomName,
      main: main
    };
    return this.httpClient.post(environment.serverURL + `/addRoom`, message);
  }

  roomConf(): Observable<any>{
    return this.websocket
      .onMessage('/rooms/rooms')
      .pipe(map(roomConfig => roomConfig));
  }

}
