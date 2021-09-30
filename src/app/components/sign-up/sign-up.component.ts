import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '@shared/services/message.service';
import { UserService } from '@shared/services/user.service';
import { ValidatorsService } from '@shared/services/validators.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public hide: boolean = true;
  public loading: boolean = false;
  form: FormGroup = new FormGroup({});
  emailControl: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  usernameControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(4),
  ]);
  passwordControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
  ]);
  passwordRepeatControl: FormControl = new FormControl(null);
  constructor(
    private validatorsService: ValidatorsService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.setForms();
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      try {
        await this.createUser();
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

  private async createUser() {
    const { email, username, password } = this.form.value;
    debugger;
    await this.userService.createUser(email, password, username);
  }

  private setForms() {
    this.form = new FormGroup(
      {
        email: this.emailControl,
        username: this.usernameControl,
        password: this.passwordControl,
        passwordRepeat: this.passwordRepeatControl,
      },
      this.validatorsService.checkIfMatchingPasswords('password', 'passwordRepeat')
    );
  }
}
