import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CanActivateCharacterGuard } from '@shared/guards/character.guard';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from 'primeng/table';
import { CharacterComponent } from './character.component';
import { CharacterRoutingModule } from './character.routes';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { CharacterStatsComponent } from './components/character-stats/character-stats.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryService } from './components/inventory/inventory.service';
import { SkillsComponent } from './components/skills/skills.component';
import { StoryComponent } from './components/story/story.component';

@NgModule({
  declarations: [
    CharacterComponent,
    CharacterStatsComponent,
    InventoryComponent,
    SkillsComponent,
    CharacterInfoComponent,
    StoryComponent
  ],
  imports: [
    SharedModule,
    CharacterRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTooltipModule,
    TableModule
  ],
  providers: [CanActivateCharacterGuard, InventoryService]
})
export class CharacterModule {}
