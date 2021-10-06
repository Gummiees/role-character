import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '@shared/shared.module';
import { CharacterRoutingModule } from './character.routes';
import { CharacterComponent } from './character.component';
import { CharacterStatsComponent } from './components/character-stats/character-stats.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SkillsComponent } from './components/skills/skills.component';
import { CharacterInfoComponent } from './components/character-info/character-info.component';

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
  ]
})
export class CharacterModule {}
