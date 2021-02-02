import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }
  public getDevices(){
    return this.httpClient.get(environment.serverURL + `/getDevices`);
  }

  public setAdded(serial: string){
    console.log("SetAdded: " + serial)
    // console.log()
    this.httpClient.get(environment.serverURL + `/added/` + serial).subscribe(data => console.log(data));
  }

  public unSetAdded(serial: string){
    console.log("SetAdded: " + serial)
    // console.log()
    this.httpClient.get(environment.serverURL + `/unsetAdded/` + serial).subscribe(data => console.log(data));
  }
}
