import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this.router.navigate(['/']);
  }
}
