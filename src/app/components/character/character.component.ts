import { Component, ViewEncapsulation } from '@angular/core';
import { TabItem } from '@shared/models/tab-item.model';
import { TurnPhases } from '@shared/models/turn.model';
import { LoadersService } from '@shared/services/loaders.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CharacterComponent {
  tabs: TabItem[] = [
    {
      label: 'Statistics',
      link: '/statistics',
      icon: 'insert_chart_outlined'
    },
    {
      label: 'Inventory',
      link: '/inventory',
      icon: 'backpack'
    },
    {
      label: 'Skills',
      link: '/skills',
      icon: 'hiking'
    },
    {
      label: 'Information',
      link: '/information',
      icon: 'account_circle'
    },
    {
      label: 'Story',
      link: '/story',
      icon: 'menu_book'
    }
  ];

  currentPhase: TurnPhases = TurnPhases.START;
  constructor(public loadersService: LoadersService) {}

  public previousTurn() {}

  public nextTurn() {}
}
