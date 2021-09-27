import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GlobalService } from '@shared/services/global.service';
import { MessageService } from '@shared/services/message.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  public photoUrl: string = this.globalService.defaultPhotoUrl;
  public loading: boolean = true;
  constructor(
    private readonly auth: AngularFireAuth,
    private globalService: GlobalService,
    private messageService: MessageService
  ) {
    this.setUserInfo();
  }

  private async setUserInfo() {
    this.loading = true;
    try {
      const user: firebase.User | null = await this.auth.currentUser;
      this.photoUrl = user?.photoURL || this.globalService.defaultPhotoUrl;
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }
}
