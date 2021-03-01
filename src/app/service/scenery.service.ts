import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeviceConfiguration} from '../models/DeviceConfiguration';
import {environment} from '../../environments/environment';
import {WebsocketService} from './websocket.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SceneryConfiguration} from '../models/SceneryConfiguration';

@Injectable({
  providedIn: 'root'
})
export class SceneryService {

  constructor(private httpClient: HttpClient, private websocket: WebsocketService) { }

  public addScenery(sceneryName: string, logo: string, roomID: number, devices: Array<DeviceConfiguration>){
    const message = {
      sceneryName: sceneryName,
      sceneryLogo: logo,
      roomID: roomID,
      devices: devices
    }
    this.httpClient.post(environment.serverURL + `/addScenery`, message).subscribe(data => console.log(data));
  }

  public getSceneries(roomID: number){
    const message = {
      roomID: roomID
    };
    return this.httpClient.post(environment.serverURL + `/getSceneries`, message);
  }

  public deleteScenery(sceneryID: number){
    console.log("delete scenery")
    return this.httpClient.delete(environment.serverURL + `/deleteScenery/${sceneryID}`);
  }

  public sceneriesList(roomID: number): Observable<any>{
    return this.websocket
      .onMessage('/scenery/sceneriesList/' + roomID)
      .pipe(map(sceneriesList => sceneriesList));
  }

  sceneryConfiguration(sceneryID: number): Observable<any>{
    return this.websocket
      .onMessage('/scenery/scenery/' + sceneryID)
      .pipe(map(sceneryConfig => sceneryConfig));
  }

  changeSceneryStatus(sceneryConfig: SceneryConfiguration){
    return this.websocket.send(`/scenery/changeSceneryStatus/${sceneryConfig.id}`, sceneryConfig);
  }
}
