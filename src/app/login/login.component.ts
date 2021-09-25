import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;
  form: FormGroup;
  emailControl: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl(null, [Validators.required]);
  constructor(public auth: AngularFireAuth, private fb: FormBuilder) {
    this.form = fb.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  emailIsIncorrect(): boolean {
    return this.emailControl.hasError('email') && !this.emailControl.hasError('required');
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginAnonymously(this.emailControl.value, this.passwordControl.value);
    } else {
      console.log('Invalid Form');
    }
  }

  async loginGoogle() {
    return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async loginAnonymously(email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
}
