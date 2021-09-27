import { Component } from '@angular/core';
import { MessageService } from '@shared/services/message.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  public photoUrl: string | null = this.userService.imageUrl;
  public loading: boolean = true;
  constructor(private messageService: MessageService, private userService: UserService) {
    this.setUserInfo();
  }

  private async setUserInfo() {
    this.loading = true;
    try {
      await this.userService.setUserInfo();
      this.photoUrl = this.userService.imageUrl;
    } catch (e: any) {
      console.error(e);
      this.messageService.showError(e);
    } finally {
      this.loading = false;
    }
  }
}
