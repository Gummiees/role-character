import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CharacterComponent } from './character.component';

@NgModule({
  declarations: [CharacterComponent],
  imports: [SharedModule],
  exports: [CharacterComponent],
  providers: [],
})
export class CharacterModule {}
