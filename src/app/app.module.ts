import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BottomNavbarComponent} from './commons/bottom-navbar/bottom-navbar.component';
import {IgxBottomNavModule} from 'igniteui-angular';
import {FirstScreenComponent} from './first-screen/first-screen.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {LightBulbButtonComponent} from './commons/light-bulb-button/light-bulb-button.component';
import {BlindButtonComponent} from './commons/blind-button/blind-button.component';
import {LoginScreenComponent} from './login-screen/login-screen.component';
import {ContainerComponent} from './container/container.component';
import {BottomSheetComponent} from './commons/bottom-sheet/bottom-sheet.component';
import {LongPress} from '../../long-press';
import { HttpClientModule } from '@angular/common/http';
import {ColorSketchModule} from 'ngx-color/sketch';
import {ColorPickerComponent} from './commons/color-picker/color-picker.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ColorCircleModule} from "ngx-color/circle";
import {MatMenuModule} from '@angular/material/menu';
import { ScenesButtonComponent } from './commons/scenes-button/scenes-button.component';
import { ScenesDetailsComponent } from './commons/scenes-details/scenes-details.component';
import { SceneDialogComponent } from './commons/scene-dialog/scene-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AccesoryDialogComponent } from './commons/accesory-dialog/accesory-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    BottomNavbarComponent,
    FirstScreenComponent,
    LightBulbButtonComponent,
    BlindButtonComponent,
    LoginScreenComponent,
    ContainerComponent,
    BottomSheetComponent,
    LongPress,
    ColorPickerComponent,
    ScenesButtonComponent,
    ScenesDetailsComponent,
    SceneDialogComponent,
    AccesoryDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxBottomNavModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatSlideToggleModule,
    MatButtonModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MatBottomSheetModule,
    MatListModule,
    HttpClientModule,
    ColorSketchModule,
    MatTabsModule,
    ColorCircleModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
