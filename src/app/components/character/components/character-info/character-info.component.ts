import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from '@shared/models/character.model';
import { LoadersService } from '@shared/services/loaders.service';
import { MessageService } from '@shared/services/message.service';
import { UserService } from '@shared/services/user.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html'
})
export class CharacterInfoComponent {
  form: FormGroup = new FormGroup({});
  nameControl: FormControl = new FormControl(null, [Validators.required]);
  backstoryControl: FormControl = new FormControl(null);
  personalityControl: FormControl = new FormControl(null);
  appearanceControl: FormControl = new FormControl(null);
  constructor(
    public loadersService: LoadersService,
    private characterService: CharacterService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.setForm();
    this.patchCharacter();
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loadersService.characterInfoLoading = true;
      try {
        const character: Character = this.form.value as Character;
        // TODO: await this.characterService.updateCharacter(character);
        this.messageService.showOk('Character updated successfully');
        this.router.navigate(['/information']);
      } catch (e: any) {
        console.error(e);
        this.messageService.showError(e);
      } finally {
        this.loadersService.characterInfoLoading = false;
      }
    }
  }

  public async onCancel() {
    this.patchCharacter();
  }

  private setForm() {
    this.form = new FormGroup({
      name: this.nameControl,
      backstory: this.backstoryControl,
      personality: this.personalityControl,
      appearance: this.appearanceControl
    });
  }

  private async patchCharacter() {
    this.loadersService.characterInfoLoading = true;
    try {
      const character: Character | null = await this.characterService.getCharacter();
      if (character) {
        this.form.patchValue(character);
      } else {
        this.messageService.showLocalError('Character not found');
        this.router.navigate(['/information']);
      }
    } catch (e: any) {
      console.error(e);
      this.messageService.showLocalError(e);
    } finally {
      this.loadersService.characterInfoLoading = false;
    }
  }
}
