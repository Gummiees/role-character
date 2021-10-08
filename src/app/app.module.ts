import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AngularFirePerformanceModule,
  PerformanceMonitoringService
} from '@angular/fire/compat/performance';
import { BasicDialogModule } from '@shared/components/basic-dialog/basic-dialog.module';
import { FooterModule } from '@shared/components/footer/footer.module';
import { MenuModule } from '@shared/components/menu/menu.module';
import { SharedModule } from '@shared/shared.module';
import { RippleModule } from 'primeng/ripple';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RippleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    BasicDialogModule,
    MenuModule,
    FooterModule
  ],
  providers: [PerformanceMonitoringService],
  bootstrap: [AppComponent]
})
export class AppModule {}
