import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }
  public getDevices(){
    return this.httpClient.get(`http://192.168.2.166:9999/getDevices`);
  }
}
