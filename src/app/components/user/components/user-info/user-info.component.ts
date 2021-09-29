import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  BasicDialogComponent,
  BasicDialogData,
} from '@shared/components/basic-dialog/basic-dialog.component';
import { CommonService } from '@shared/services/common.service';
import { GlobalService } from '@shared/services/global.service';
import { MessageService } from '@shared/services/message.service';
import { ValidatorsService } from '@shared/services/validators.service';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserInfoComponent implements OnDestroy {
  public hide: boolean = true;
  public loading: boolean = false;
  public name?: string | null;
  public email?: string | null;
  public photoUrl?: string | null;

  form: FormGroup = new FormGroup({});
  photoForm: FormGroup = new FormGroup({});
  photoControl: FormControl = new FormControl(null, [
    Validators.pattern(this.globalService.regexUrl),
  ]);
  usernameControl: FormControl = new FormControl(null, [Validators.required]);
  newPasswordControl: FormControl = new FormControl(null, [Validators.minLength(6)]);
  newPasswordRepeatControl: FormControl = new FormControl(null);

  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private globalService: GlobalService,
    private userService: UserService,
    private messageService: MessageService,
    private commonService: CommonService,
    private validatorsService: ValidatorsService
  ) {
    this.setForms();
    this.subscribeToUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
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

      try {
        const userPromise = this.updateUsername();
        const pwPromise = this.updatePassword();
        await Promise.all([userPromise, pwPromise]);
        this.messageService.showOk('Profile updated successfully');
      } catch (e: any) {
        console.error(e);
        this.messageService.showError(e);
      } finally {
        this.loading = false;
      }
    }
  }

  async onSubmitPhoto() {
    if (this.photoForm.valid) {
      this.loading = true;
      await this.updatePhoto();
      this.loading = false;
    }
  }

  onPhotoUrlChanged(event: any) {
    if (this.photoControl.valid) {
      this.photoUrl = event.target.value;
    }
  }

  private async updatePhoto() {
    try {
      const photoUrl = this.photoControl.value;
      await this.userService.updateProfile(null, photoUrl);
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    }
  }

  private async updateUsername() {
    const username = this.usernameControl.value;
    if (username !== this.name) {
      await this.userService.updateProfile(username);
    }
  }

  private async updatePassword() {
    const newPassword = this.newPasswordControl.value;
    const newPasswordRepeat = this.newPasswordRepeatControl.value;
    if (!this.commonService.isNullOrEmpty(newPassword) && newPassword === newPasswordRepeat) {
      await this.userService.updatePassword(newPassword);
    }
  }

  private setUserInfo(user: firebase.User | null) {
    this.setUsername(user?.displayName || null);
    this.email = user?.email || null;
    this.photoUrl = this.userService.imageUrl;
  }

  private setUsername(username: string | null) {
    this.name = username;
    this.usernameControl.setValue(this.name);
  }

  private subscribeToUser() {
    const sub: Subscription = this.userService.$user.subscribe((user: firebase.User | null) =>
      this.setUserInfo(user)
    );
    this.subscriptions.push(sub);
  }

  private setForms() {
    this.form = new FormGroup(
      {
        username: this.usernameControl,
        newPassword: this.newPasswordControl,
        newPasswordRepeat: this.newPasswordRepeatControl,
      },
      this.validatorsService.checkIfMatchingPasswords('newPassword', 'newPasswordRepeat')
    );

    this.photoForm = new FormGroup({
      photoUrl: this.photoControl,
    });
  }
}
