import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }
  public getDevices(){
    return this.httpClient.get(`http://192.168.0.16:9999/getDevices`);
  }

  public setAdded(serial: string){
    console.log("SetAdded: " + serial)
    // console.log()
    this.httpClient.get(`http://192.168.0.16:9999/added/` + serial).subscribe(data => console.log(data));
  }

  public unSetAdded(serial: string){
    console.log("SetAdded: " + serial)
    // console.log()
    this.httpClient.get(`http://192.168.0.16:9999/unsetAdded/` + serial).subscribe(data => console.log(data));
  }
}
