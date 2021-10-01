import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '@shared/services/message.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public hide: boolean = true;
  public loading: boolean = false;
  form: FormGroup = new FormGroup({});
  emailControl: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl(null, [Validators.required]);
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.setForm();
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      try {
        const { email, password } = this.form.value;
        await this.userService.signIn(email, password);
        this.messageService.showOk('Welcome and have fun!');
        this.router.navigate(['/']);
      } catch (e: any) {
        console.error(e);
        this.messageService.showError(e);
      } finally {
        this.loading = false;
      }
    }
  }

  async onGoogleSignIn() {
    this.loading = true;
    try {
      await this.userService.googleSignIn();
      this.messageService.showOk('Welcome and have fun!');
      this.router.navigate(['/']);
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  private setForm() {
    this.form = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }
}
