import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, Renderer2, ViewChild } from '@angular/core';
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
  constructor(
    private menuService: MenuService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.listenToToggle();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  optionClicked() {
    this.menuService.toggle();
  }

  private onToggle(isActive: boolean) {
    this.toggleBodyClass(isActive);
    this.toggleMenu();
  }

  private toggleBodyClass(isActive: boolean) {
    if (isActive) {
      this.renderer.addClass(this.document.body, 'menu-active');
    } else {
      // Emulates the transition since CSS can't apply transition to overflow.
      setTimeout(() => this.renderer.removeClass(this.document.body, 'menu-active'), 400);
    }
  }

  private toggleMenu() {
    if (this.navComponent) {
      this.navComponent.toggle();
    }
  }

  private listenToToggle() {
    const sub: Subscription = this.menuService.$toggle.subscribe((isActive: boolean) =>
      this.onToggle(isActive)
    );
    this.subscriptions.push(sub);
  }
}
