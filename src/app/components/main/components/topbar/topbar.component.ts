import { Component, OnDestroy } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnDestroy {
  public photoUrl: string | null = this.userService.imageUrl;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {
    this.subscribeToUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private setUserInfo() {
    this.photoUrl = this.userService.imageUrl;
  }

  private subscribeToUser() {
    const sub: Subscription = this.userService.$user.subscribe(() => this.setUserInfo());
    this.subscriptions.push(sub);
  }
}
