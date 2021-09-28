import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  BasicDialogComponent,
  BasicDialogData,
} from '@shared/components/basic-dialog/basic-dialog.component';
import { GlobalService } from '@shared/services/global.service';
import { MessageService } from '@shared/services/message.service';
import { ValidatorsService } from '@shared/services/validators.service';
import firebase from 'firebase/compat/app';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserInfoComponent {
  public hide: boolean = true;
  public loading: boolean = true;
  public name?: string | null;
  public email?: string | null;
  public photoUrl: string = this.globalService.defaultPhotoUrl;

  form: FormGroup = new FormGroup({});
  usernameControl: FormControl = new FormControl(null, [Validators.required]);
  newPasswordControl: FormControl = new FormControl(null, [Validators.minLength(6)]);
  newPasswordRepeatControl: FormControl = new FormControl(null);

  constructor(
    private dialog: MatDialog,
    private globalService: GlobalService,
    private userService: UserService,
    private messageService: MessageService,
    private validatorsService: ValidatorsService
  ) {
    this.setForm();
    this.setUserInfo();
  }

  private setForm() {
    this.form = new FormGroup(
      {
        username: this.usernameControl,
        newPassword: this.newPasswordControl,
        newPasswordRepeat: this.newPasswordRepeatControl,
      },
      this.validatorsService.checkIfMatchingPasswords('newPassword', 'newPasswordRepeat')
    );
  }

  onLogout() {
    const data: BasicDialogData = {
      header: 'Logout',
      body: 'Are you sure you want to logout?',
    };
    const dialogRef = this.dialog.open(BasicDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((ok: boolean) => {
      if (ok === true) {
        this.userService.logout();
      }
    });
  }

  onDelete() {
    const data: BasicDialogData = {
      header: 'Delete account',
      body: 'Are you sure you want to delete your account? Everything related to your account will be erared forever!',
    };
    const dialogRef = this.dialog.open(BasicDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((ok: boolean) => {
      if (ok === true) {
        this.userService.deleteUser();
      }
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;

      const userPromise = this.updateUsername();
      await Promise.all([userPromise]);

      this.loading = false;
    }
  }

  async updateUsername() {
    try {
      const username = this.usernameControl.value;
      if (username !== this.name) {
        await this.userService.updateProfile(username);
      }
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    }
  }

  private async setUserInfo() {
    this.loading = true;
    try {
      const user: firebase.User | null = await this.userService.getUserInfo();
      this.name = user?.displayName || null;
      this.email = user?.email || null;
      this.photoUrl = this.userService.imageUrl || this.globalService.defaultPhotoUrl;
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }
}
