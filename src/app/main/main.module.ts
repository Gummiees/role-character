import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { TopbarModule } from './components/topbar/topbar.module';
import { CustomTableModule } from './components/table/table.module';
import { CharacterModule } from './components/character/character.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, TopbarModule, CustomTableModule, CharacterModule],
  exports: [],
  providers: [],
})
export class MainModule {}
