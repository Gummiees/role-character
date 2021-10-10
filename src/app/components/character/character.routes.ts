import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateCharacterGuard } from '@shared/guards/character.guard';
import { CharacterComponent } from './character.component';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { CharacterStatsComponent } from './components/character-stats/character-stats.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SkillsComponent } from './components/skills/skills.component';
import { StoryComponent } from './components/story/story.component';
const routes: Routes = [
  {
    path: '',
    component: CharacterComponent,
    children: [
      {
        path: '',
        redirectTo: 'information',
        pathMatch: 'full'
      },
      {
        path: 'information',
        component: CharacterInfoComponent,
        canActivate: [CanActivateCharacterGuard]
      },
      {
        path: 'statistics',
        component: CharacterStatsComponent,
        canActivate: [CanActivateCharacterGuard]
      },
      {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [CanActivateCharacterGuard]
      },
      {
        path: 'skills',
        component: SkillsComponent,
        canActivate: [CanActivateCharacterGuard]
      },
      {
        path: 'story',
        component: StoryComponent,
        canActivate: [CanActivateCharacterGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule {}
