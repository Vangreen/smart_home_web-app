import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import set = Reflect.set;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }
  public getDevices(){
    return this.httpClient.get(environment.serverURL + `/getDevices`);
  }

  public addDevice(setSerial: number, deviceType: string, setName: string, setRoom: string){
    const message = {
      serial: setSerial,
      deviceType: deviceType,
      deviceName: setName,
      room: setRoom
    };
    this.httpClient.post(environment.serverURL + `/addDevice`, message).subscribe(data => console.log(data));
  }

  public deleteDevice(setSerial: number){
    const message = {
      serial: setSerial
    };
    this.httpClient.post(environment.serverURL + `/deleteDevice`, message).subscribe(data => console.log(data));
  }

}
