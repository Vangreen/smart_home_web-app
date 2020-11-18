import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FirstScreenComponent} from './first-screen/first-screen.component';
import {LoginScreenComponent} from './login-screen/login-screen.component';
import {ContainerComponent} from './container/container.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent },
  { path: 'container-component', component: ContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
