import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character.component';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { CharacterStatsComponent } from './components/character-stats/character-stats.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SkillsComponent } from './components/skills/skills.component';
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
        component: CharacterInfoComponent
      },
      {
        path: 'statistics',
        component: CharacterStatsComponent
      },
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'skills',
        component: SkillsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule {}
