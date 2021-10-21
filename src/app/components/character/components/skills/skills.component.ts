import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '@shared/models/character.model';
import { Skill } from '@shared/models/skill.model';
import { CommonService } from '@shared/services/common.service';
import { DialogService } from '@shared/services/dialog.service';
import { LoadersService } from '@shared/services/loaders.service';
import { MessageService } from '@shared/services/message.service';
import { first } from 'rxjs/operators';
import { CharacterService } from '../../services/character.service';
import { AddSkillDialogComponent } from './add-skill-dialog/add-skill-dialog.component';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html'
})
export class SkillsComponent {
  constructor(
    public loadersService: LoadersService,
    private dialogService: DialogService,
    private commonService: CommonService,
    private characterService: CharacterService,
    private skillService: SkillService,
    private messageService: MessageService,
    private router: Router
  ) {}

  public buttonsDisabled(): boolean {
    return this.loadersService.skillsLoading;
  }

  public async onCreateSkill() {
    this.dialogService
      .openGenericDialog(AddSkillDialogComponent)
      .pipe(first())
      .subscribe((skill: Skill) => {
        if (!this.commonService.isNullOrUndefined(skill)) {
          this.createItem(skill);
        }
      });
  }

  private async createItem(skill: Skill) {
    this.loadersService.inventoryLoading = true;
    try {
      const character: Character | null = await this.characterService.character;
      if (character) {
        await this.skillService.createItem(character, skill);
        this.messageService.showOk('Skill added successfully');
      } else {
        this.messageService.showLocalError('You must have a character to add a skill');
        this.router.navigate(['/create']);
      }
    } catch (e: any) {
      console.error(e);
      this.messageService.showLocalError(e);
    } finally {
      this.loadersService.inventoryLoading = false;
    }
  }
}
