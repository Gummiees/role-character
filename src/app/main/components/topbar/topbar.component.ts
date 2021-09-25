import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  public name?: string | null;
  public loading: boolean = true;
  constructor(private readonly auth: AngularFireAuth, private readonly router: Router) {
    this.getName();
  }

  onLogout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  private async getName() {
    this.loading = true;
    try {
      const user: firebase.User | null = await this.auth.currentUser;
      if (user == null) {
        this.onLogout();
      }
      this.name = user?.displayName || user?.email || null;
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
