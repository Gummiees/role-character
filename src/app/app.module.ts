import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { AppComponent } from './app.component';
import { CharacterModule } from './character/character.module';
import { CustomTableModule } from './table/table.module';
import { TopbarModule } from './topbar/topbar.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TopbarModule,
    CustomTableModule,
    RippleModule,
    CharacterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
