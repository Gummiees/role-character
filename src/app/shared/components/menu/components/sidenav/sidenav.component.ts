import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  @ViewChild(MatSidenav) private navComponent: MatSidenav | undefined;
  constructor(private menuService: MenuService) {
    this.listenToToggle();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private openMenu() {
    if (this.navComponent) {
      this.navComponent.toggle();
    }
  }

  private listenToToggle() {
    const sub: Subscription = this.menuService.$toggle.subscribe(() => this.openMenu());
    this.subscriptions.push(sub);
  }
}
