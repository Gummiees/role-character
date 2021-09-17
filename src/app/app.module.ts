import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { AppComponent } from './app.component';
import { CharacterModule } from './character/character.module';
import { CustomTableModule } from './table/table.module';
import { TopbarModule } from './topbar/topbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, TopbarModule, CustomTableModule, RippleModule, CharacterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
