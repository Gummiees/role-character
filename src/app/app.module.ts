import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { TopbarModule } from './topbar/topbar.module';
import { CustomTableModule } from './table/table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TopbarModule,
    CustomTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
