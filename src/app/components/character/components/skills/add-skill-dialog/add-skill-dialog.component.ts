import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Skill } from '@shared/models/skill.model';
import { TurnPhases } from '@shared/models/turn.model';

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html'
})
export class AddSkillDialogComponent {
  form: FormGroup = new FormGroup({});
  nameControl: FormControl = new FormControl(null);
  descriptionControl: FormControl = new FormControl(null);
  activeControl: FormControl = new FormControl(false);
  doesRollDiceControl: FormControl = new FormControl(false);
  whenRollDiceControl: FormControl = new FormControl(TurnPhases.START, [Validators.required]);
  permanentControl: FormControl = new FormControl(false);
  turnsLeftControl: FormControl = new FormControl(0, [Validators.min(0)]);
  levelControl: FormControl = new FormControl(1, [Validators.min(0)]);
  caster_nameControl: FormControl = new FormControl(null);
  statsControl: FormControl = new FormControl(null, [Validators.required]);
  constructor(public dialogRef: MatDialogRef<AddSkillDialogComponent>) {
    this.form = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
      active: this.activeControl,
      doesRollDice: this.doesRollDiceControl,
      whenRollDice: this.whenRollDiceControl,
      permanent: this.permanentControl,
      turnsLeft: this.turnsLeftControl,
      level: this.levelControl,
      caster_name: this.caster_nameControl,
      stats: this.statsControl
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const item: Skill = {
        name: this.nameControl.value,
        description: this.descriptionControl.value,
        active: this.activeControl.value,
        doesRollDice: this.doesRollDiceControl.value,
        whenRollDice: this.whenRollDiceControl.value,
        permanent: this.permanentControl.value,
        turnsLeft: this.turnsLeftControl.value,
        level: this.levelControl.value,
        caster_name: this.caster_nameControl.value,
        stats: this.statsControl.value
      };
      this.dialogRef.close(item);
    }
  }
}
