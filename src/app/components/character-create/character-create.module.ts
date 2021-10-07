import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from 'primeng/table';
import { CharacterCreateComponent } from './character-create.component';
import { CharacterCreateRoutingModule } from './character-create.routes';

@NgModule({
  declarations: [CharacterCreateComponent],
  imports: [
    SharedModule,
    CharacterCreateRoutingModule,
    TableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: []
})
export class CharacterCreateModule {}
