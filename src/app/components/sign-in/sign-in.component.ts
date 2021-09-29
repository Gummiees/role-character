import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(private router: Router) {}

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this.router.navigate(['/']);
  }
}
