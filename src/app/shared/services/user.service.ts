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
      sessionStorage.removeItem('profileImageUrl');
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

  public async createUser(email: string, password: string, username?: string) {
    const credential = await this.auth.createUserWithEmailAndPassword(email, password);
    if (username) {
      await this.updateUsername(username);
    }
    this.user = credential.user;
    this.$user.next(this.user);
  }

  public async googleSignUp() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.auth.signInWithPopup(provider);
    this.user = credential.user;
    this.$user.next(this.user);
  }

  public async signIn(email: string, password: string) {
    const credential = await this.auth.signInWithEmailAndPassword(email, password);
    this.user = credential.user;
    this.$user.next(this.user);
  }

  public async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.auth.signInWithPopup(provider);
    this.user = credential.user;
    this.$user.next(this.user);
  }

  public async forgotPassword(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }

  public async deleteUser() {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
      this.$user.next(this.user);
    }
    await this.user?.delete();
    this.router.navigate(['/sign-in']);
  }

  public async updateUsername(username: string) {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    await this.user?.updateProfile({ displayName: username });
    this.$user.next(this.user);
  }

  public async updateImage(photoURL: string | null) {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    await this.user?.updateProfile({ photoURL: photoURL });
    this.imageUrl = this.user?.photoURL || null;
    this.$user.next(this.user);
  }

  public async updatePassword(newPassword: string) {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    // TODO: Confirm through email first in the future
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

  public async setUserInfo(forceUpdateImage?: boolean) {
    if (!this.user) {
      this.user = await this.auth.currentUser;
      this.$user.next(this.user);
    }
    if (forceUpdateImage || !this.imageUrl) {
      this.imageUrl = this.user?.photoURL || null;
    }
  }
}
