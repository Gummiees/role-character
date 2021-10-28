import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '@shared/models/skill.model';
import { Statistic } from '@shared/models/statistic.model';
import { GlobalService } from '@shared/services/global.service';

export interface SkillDialogData {
  skill: Skill | null | undefined;
  readonly: boolean;
  statistics: Statistic[];
}

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html'
})
export class SkillDialogComponent {
  form: FormGroup = new FormGroup({});
  nameControl: FormControl = new FormControl(null, [Validators.required]);
  descriptionControl: FormControl = new FormControl(null);
  activeControl: FormControl = new FormControl(false);
  doesRollDiceControl: FormControl = new FormControl(false);
  whenRollDiceControl: FormControl = new FormControl(
    { value: this.globalService.turnStart, disabled: !this.doesRollDiceControl.value },
    [Validators.required]
  );
  turnBasedControl: FormControl = new FormControl(false);
  turnsLeftControl: FormControl = new FormControl(
    { value: 0, disabled: !this.turnBasedControl.value },
    [Validators.min(0)]
  );
  levelControl: FormControl = new FormControl(1, [Validators.min(0)]);
  caster_nameControl: FormControl = new FormControl(null);
  statsControl: FormControl = new FormControl([]);

  step: number = 0;
  constructor(
    public globalService: GlobalService,
    public dialogRef: MatDialogRef<SkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SkillDialogData
  ) {
    this.initForm();
    this.initData();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const item: Skill = {
        name: this.nameControl.value,
        description: this.descriptionControl.value,
        active: this.activeControl.value,
        doesRollDice: this.doesRollDiceControl.value,
        whenRollDice: this.getWhenRollDice(),
        turnBased: this.turnBasedControl.value,
        turnsLeft: this.getTurnsLeft(),
        level: this.levelControl.value,
        caster_name: this.caster_nameControl.value,
        stats: this.statsControl.value
      };
      this.dialogRef.close(item);
    }
  }

  public onDoesRollDiceChanges() {
    this.doesRollDiceControl.value
      ? this.whenRollDiceControl.enable()
      : this.whenRollDiceControl.disable();
  }

  public onTurnBasedChanges() {
    this.turnBasedControl.value ? this.turnsLeftControl.enable() : this.turnsLeftControl.disable();
  }

  public previous() {
    this.step--;
  }

  public next() {
    this.step++;
  }

  private getTurnsLeft(): number {
    if (!this.turnBasedControl.value) {
      return 0;
    }
    return this.turnsLeftControl.value;
  }

  private getWhenRollDice(): string | undefined {
    if (!this.doesRollDiceControl.value) {
      return undefined;
    }
    return this.whenRollDiceControl.value;
  }

  private initForm() {
    this.form = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
      active: this.activeControl,
      doesRollDice: this.doesRollDiceControl,
      whenRollDice: this.whenRollDiceControl,
      turnBased: this.turnBasedControl,
      turnsLeft: this.turnsLeftControl,
      level: this.levelControl,
      caster_name: this.caster_nameControl,
      stats: this.statsControl
    });
  }

  private initData() {
    if (this.data && this.data.skill) {
      this.nameControl.setValue(this.data.skill.name);
      this.descriptionControl.setValue(this.data.skill.description);
      this.activeControl.setValue(this.data.skill.active);
      this.doesRollDiceControl.setValue(this.data.skill.doesRollDice);
      this.whenRollDiceControl.setValue(this.data.skill.whenRollDice);
      this.turnBasedControl.setValue(this.data.skill.turnBased);
      this.turnsLeftControl.setValue(this.data.skill.turnsLeft);
      this.levelControl.setValue(this.data.skill.level);
      this.caster_nameControl.setValue(this.data.skill.caster_name);
      this.statsControl.setValue(this.data.skill.stats);

      if (this.data.readonly) {
        this.form.disable();
      }
    }
  }
}
