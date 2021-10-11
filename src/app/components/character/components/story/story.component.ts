import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from '@shared/models/character.model';
import { LoadersService } from '@shared/services/loaders.service';
import { MessageService } from '@shared/services/message.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {
  fullscreen: boolean = false;
  form: FormGroup = new FormGroup({});
  storyControl: FormControl = new FormControl(null, [Validators.required]);
  private character?: Character;
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
      this.loadersService.storyLoading = true;
      try {
        if (this.character) {
          const story: string = this.form.value.story;
          this.character.story = story;
          await this.characterService.updateCharacter(this.character);
          this.messageService.showOk('Character updated successfully');
          this.form.reset();
          this.storyControl.setValue(story);
        } else {
          this.messageService.showLocalError('Character not found');
          this.router.navigate(['/create']);
        }
      } catch (e: any) {
        console.error(e);
        this.messageService.showError(e);
      } finally {
        this.loadersService.storyLoading = false;
      }
    }
  }

  isDisabled(): boolean {
    return this.form.invalid || this.loadersService.storyLoading;
  }

  onScreenButton() {
    this.fullscreen = !this.fullscreen;
  }

  getScreenTooltip(): string {
    return this.fullscreen ? 'Exit fullscreen' : 'Open fullscreen';
  }

  private setForm() {
    this.form = new FormGroup({
      story: this.storyControl
    });
  }

  private async patchCharacter() {
    this.loadersService.storyLoading = true;
    try {
      const character: Character | null = await this.characterService.character;
      if (character) {
        this.character = character;
        this.storyControl.setValue(character.story);
      } else {
        this.messageService.showLocalError('Character not found');
        this.router.navigate(['/create']);
      }
    } catch (e: any) {
      console.error(e);
      this.messageService.showLocalError(e);
    } finally {
      this.loadersService.storyLoading = false;
    }
  }
}
