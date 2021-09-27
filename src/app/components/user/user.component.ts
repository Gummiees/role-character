import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  BasicDialog,
  BasicDialogData,
} from '@shared/components/basic-dialog/basic-dialog.component';
import { GlobalService } from '@shared/services/global.service';
import { MessageService } from '@shared/services/message.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  public loading: boolean = true;
  public name?: string | null;
  public email?: string | null;
  public photoUrl: string = this.globalService.defaultPhotoUrl;

  private user?: firebase.User | null;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private messageService: MessageService
  ) {
    this.setUserInfo();
  }

  onLogout() {
    const data: BasicDialogData = {
      header: 'Logout',
      body: 'Are you sure you want to logout?',
    };
    const dialogRef = this.dialog.open(BasicDialog, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((ok: boolean) => {
      if (ok === true) {
        this.logout();
      }
    });
  }

  private logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  private async deleteUser() {
    this.loading = true;
    try {
      if (this.user == null) {
        this.user = await this.auth.currentUser;
      }
      await this.user?.delete();
      this.router.navigate(['/login']);
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  private async updateProfile(username: string, photoURL: string) {
    this.loading = true;

    try {
      if (this.user == null) {
        this.user = await this.auth.currentUser;
      }
      await this.user?.updateProfile({ displayName: username, photoURL });
      this.messageService.showOk('Profile updated successfully');
      this.setUserInfo();
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  private async updatePassword(newPassword: string) {
    this.loading = true;
    try {
      if (this.user == null) {
        this.user = await this.auth.currentUser;
      }
      await this.user?.updatePassword(newPassword);
      this.messageService.showOk('Password updated successfully');
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  private async updateEmail(newEmail: string) {
    this.loading = true;
    try {
      if (this.user == null) {
        this.user = await this.auth.currentUser;
      }
      await this.user?.verifyBeforeUpdateEmail(newEmail);
      this.messageService.showOk('An email has been sent to change your email address');
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  private async setUserInfo() {
    this.loading = true;
    try {
      if (this.user == null) {
        this.user = await this.auth.currentUser;
      }
      this.name = this.user?.displayName || null;
      this.email = this.user?.email || null;
      this.photoUrl = this.user?.photoURL || this.globalService.defaultPhotoUrl;
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }
}
