import { Component } from '@angular/core';
import { TabItem } from '@shared/models/tab-item.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  tabs: TabItem[] = [
    {
      label: 'Information',
      link: '/information',
      icon: 'account_circle'
    },
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
    }
  ];
  constructor() {}
}
