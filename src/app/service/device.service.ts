import { Injectable } from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Observable, pipe} from 'rxjs';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private websocket: WebsocketService) { }

  deviceConf(serial: number): Observable<any>{
    return this.websocket
      .onMessage('/device/device/' + serial)
      .pipe(map(deviceConfig => deviceConfig));
  }

  deviceColorConf(serial: number): Observable<any>{
    return this.websocket
      .onMessage('/device/changeDeviceColor/' + serial)
      .pipe(map(deviceConfig => deviceConfig));
  }

  unassignedDevicesConfig(): Observable<any>{
    return this.websocket
      .onMessage('/device/unassignedDevices')
      .pipe(map(unassignedDevices => unassignedDevices));
  }

  changeDeviceStatus(serial: number, message) {
    return this.websocket.send('/device/changeDeviceStatus/' + serial, message);
  }

  changeDeviceColor(serial: number, message) {
    return this.websocket.send('/device/changeDeviceColor/' + serial, message);
  }
}
