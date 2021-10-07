import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';
import { CharacterComponent } from './character.component';
import { CharacterRoutingModule } from './character.routes';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { CharacterStatsComponent } from './components/character-stats/character-stats.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SkillsComponent } from './components/skills/skills.component';

@NgModule({
  declarations: [
    CharacterComponent,
    CharacterStatsComponent,
    InventoryComponent,
    SkillsComponent,
    CharacterInfoComponent
  ],
  imports: [
    SharedModule,
    CharacterRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: []
})
export class CharacterModule {}
