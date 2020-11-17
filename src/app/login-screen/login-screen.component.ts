import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  value: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  btnClick() {
    console.log('clicked');
    this.router.navigateByUrl('/container-component');
    this.value = 'clicked';
  }
}
