import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnDestroy {
  public openSidebar: boolean = false;
  private subscriptions: Subscription[] = [];
  @ViewChild(MatSidenav) private navComponent: MatSidenav | undefined;
  constructor(private menuService: MenuService) {
    this.listenToToggle();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  optionClicked() {
    this.menuService.toggle();
  }

  private onToggle() {
    if (this.navComponent) {
      this.navComponent.toggle();
    }
  }

  private listenToToggle() {
    const sub: Subscription = this.menuService.$toggle.subscribe(() => this.onToggle());
    this.subscriptions.push(sub);
  }
}
