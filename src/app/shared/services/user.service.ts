import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonService } from '@shared/services/common.service';
import { GlobalService } from '@shared/services/global.service';
import { MessageService } from '@shared/services/message.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public set imageUrl(url: string | null) {
    if (!url) {
      this.imageBase64 = null;
      return;
    }
    let img: HTMLImageElement | null = document.createElement('img');
    img.src = url;
    img.crossOrigin = 'anonymous';
    const imgData: string | undefined = this.commonService.getBase64Image(img);
    this.imageBase64 = imgData;
    if (!imgData) {
      sessionStorage.removeItem('profileImageBase64');
      return;
    }
    sessionStorage.setItem('profileImageBase64', imgData);
  }

  public get imageUrl(): string | null {
    if (!this.imageBase64) {
      this.imageBase64 = sessionStorage.getItem('profileImageBase64');
    }
    return this.imageBase64;
  }
  public user: firebase.User | null = null;
  private imageBase64: string | null | undefined = null;

  constructor(
    private readonly auth: AngularFireAuth,
    private router: Router,
    private messageService: MessageService,
    private commonService: CommonService,
    private globalService: GlobalService
  ) {}

  public logout() {
    this.auth.signOut();
    this.imageUrl = null;
    this.router.navigate(['/login']);
  }

  public async deleteUser() {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    await this.user?.delete();
    this.router.navigate(['/login']);
  }

  public async updateProfile(username?: string | null, photoURL?: string | null) {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    await this.user?.updateProfile({ displayName: username, photoURL });
    this.messageService.showOk('Profile updated successfully');
    this.setUserInfo();
  }

  public async updatePassword(newPassword: string) {
    if (this.user == null) {
      this.user = await this.auth.currentUser;
    }
    await this.user?.updatePassword(newPassword);
    this.messageService.showOk('Password updated successfully');
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
    }
    if (!this.imageUrl) {
      this.imageUrl = this.user?.photoURL || this.globalService.defaultPhotoUrl;
    }
  }
}
