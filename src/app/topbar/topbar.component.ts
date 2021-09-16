import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { SkillService } from '../table/skill.service';

@Component({
    selector: 'rc-topbar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
    items: MenuItem[] = [];
    name: string;
    loading: boolean = false;
    constructor(public skillService: SkillService) {
      this.getName();
    }

    private async getName() {
      this.loading = true;
      try {
        this.name = await this.skillService.getName();
      } finally {
        this.loading = false;
      }
    }
}
