import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BasicDialogComponent,
  BasicDialogData,
} from '@shared/components/basic-dialog/basic-dialog.component';
import { GlobalService } from '@shared/services/global.service';
import { MessageService } from '@shared/services/message.service';
import { UserService } from '../../../../shared/services/user.service';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  public hide: boolean = true;
  public loading: boolean = true;
  public name?: string | null;
  public email?: string | null;
  public photoUrl: string = this.globalService.defaultPhotoUrl;

  formPassword: FormGroup = this.formBuilder.group({});
  newPassword: FormControl = new FormControl(null, [Validators.required]);
  newPasswordRepeat: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private dialog: MatDialog,
    private globalService: GlobalService,
    private userService: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.setUserInfo();
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

  onChangePassword() {
    console.log('onChangePassword');
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
