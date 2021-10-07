import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCreateComponent } from './character-create.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterCreateRoutingModule {}
