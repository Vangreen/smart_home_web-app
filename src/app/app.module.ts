import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BottomNavbarComponent } from './commons/bottom-navbar/bottom-navbar.component';
import { IgxBottomNavModule } from 'igniteui-angular';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { SecondScreenComponent } from './second-screen/second-screen.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from '@angular/material/button';
import { LightBulbButtonComponent } from './commons/light-bulb-button/light-bulb-button.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomNavbarComponent,
    FirstScreenComponent,
    SecondScreenComponent,
    LightBulbButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxBottomNavModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatSlideToggleModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
