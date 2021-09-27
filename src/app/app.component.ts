import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadingRouteConfig: boolean = false;
  loggedIn: boolean = false;
  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private readonly auth: AngularFireAuth
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });

    this.auth.authState.subscribe((user) => (this.loggedIn = !!user));
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
