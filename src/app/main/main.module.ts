import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CharacterModule } from './components/character/character.module';
import { CustomTableModule } from './components/table/table.module';
import { TopbarModule } from './components/topbar/topbar.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [SharedModule, MainRoutingModule, TopbarModule, CustomTableModule, CharacterModule],
  exports: [],
  providers: [],
})
export class MainModule {}
