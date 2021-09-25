import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  BasicDialog,
  BasicDialogData,
} from '@shared/components/basic-dialog/basic-dialog.component';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  public name?: string | null;
  public email?: string | null;
  public photoUrl?: string | null;
  public loading: boolean = true;
  private user?: firebase.User | null;
  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private dialog: MatDialog
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
    } catch (e) {
      console.error(e);
      // TODO: Mostrar mensaje de error
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
      // TODO: Mostrar mensaje de éxito
      this.user = await this.auth.currentUser;
    } catch (e) {
      console.error(e);
      // TODO: Mostrar mensaje de error
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
      // TODO: Mostrar mensaje de éxito
    } catch (e) {
      console.error(e);
      // TODO: Mostrar mensaje de error
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
      // TODO: Mostrar mensaje de éxito
    } catch (e) {
      console.error(e);
      // TODO: Mostrar mensaje de error
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
      this.photoUrl = this.user?.photoURL || null;
    } catch (e) {
      console.error(e);
      // TODO: Mostrar mensaje de error
    } finally {
      this.loading = false;
    }
  }
}
