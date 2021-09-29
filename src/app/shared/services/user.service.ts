import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common.service';
import { MessageService } from '@shared/services/message.service';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public set imageUrl(url: string | null) {
    if (!url) {
      this._imageUrl = null;
      return;
    }
    let img: HTMLImageElement | null = document.createElement('img');
    img.src = url;
    img.crossOrigin = 'anonymous';
    const imgData: string | undefined = this.commonService.getBase64Image(img);
    this._imageUrl = imgData;
    if (!imgData) {
      sessionStorage.setItem('profileImageUrl', url);
      return;
    }
    sessionStorage.setItem('profileImageUrl', imgData);
  }

  public get imageUrl(): string | null {
    if (!this._imageUrl) {
      this._imageUrl = sessionStorage.getItem('profileImageUrl');
    }
    return this._imageUrl;
  }
  public user: firebase.User | null = null;
  private _imageUrl: string | null | undefined = null;

  public $user: BehaviorSubject<firebase.User | null> = new BehaviorSubject(this.user);

  constructor(
    private readonly auth: AngularFireAuth,
    private router: Router,
    private messageService: MessageService,
    private commonService: CommonService
  ) {
    this.setUserInfo();
  }

  public logout() {
    this.auth.signOut();
    this.imageUrl = null;
    this.router.navigate(['/sign-in']);
  }

  public async deleteUser() {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
      this.$user.next(this.user);
    }
    await this.user?.delete();
    this.router.navigate(['/sign-in']);
  }

  public async updateProfile(username?: string | null, photoURL?: string | null) {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    if (!username) {
      username = this.user?.displayName;
    }
    await this.user?.updateProfile({ displayName: username, photoURL });
    this.user = await this.auth.currentUser;
    if (photoURL) {
      this.imageUrl = this.user?.photoURL || null;
    }
    this.$user.next(this.user);
  }

  public async updatePassword(newPassword: string) {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    await this.user?.updatePassword(newPassword);
  }

  public async updateEmail(newEmail: string) {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    await this.user?.verifyBeforeUpdateEmail(newEmail);
    this.messageService.showOk('An email has been sent to change your email address');
  }

  public async getUserInfo(): Promise<firebase.User | null> {
    await this.setUserInfo();
    return this.user;
  }

  public async setUserInfo() {
    if (!this.user) {
      this.user = await this.auth.currentUser;
      this.$user.next(this.user);
    }
    if (!this.imageUrl) {
      this.imageUrl = this.user?.photoURL || null;
    }
  }
}
