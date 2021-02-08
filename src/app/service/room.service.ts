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

  public addRoom(roomNamel: string, mainl: string){
    const message = {
      roomName: roomNamel,
      main: mainl
    };
    return this.httpClient.post(environment.serverURL + `/addRoom`, message).subscribe(data => console.log(data));
  }

  public deleteRoom(roomID: number){
    const message = {
      id: roomID,
    };
    return this.httpClient.post(environment.serverURL + `/deleteRoom`, message).subscribe(data => console.log(data));
  }


  roomConf(): Observable<any>{
    return this.websocket
      .onMessage('/rooms/rooms')
      .pipe(map(roomConfig => roomConfig));
  }

}
