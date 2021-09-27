import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from '@shared/components/footer/footer.module';
import { SharedModule } from '@shared/shared.module';
import { firebaseUiAuthConfig } from '@shared/utils/firebaseui.config';
import { FirebaseUIModule } from 'firebaseui-angular';
import { RippleModule } from 'primeng/ripple';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BasicDialogModule } from '@shared/components/basic-dialog/basic-dialog.module';
import { TopbarModule } from './components/main/components/topbar/topbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RippleModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FooterModule,
    MatProgressSpinnerModule,
    BasicDialogModule,
    TopbarModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
