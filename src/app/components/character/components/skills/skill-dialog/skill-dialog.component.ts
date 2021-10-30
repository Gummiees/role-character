import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill, StatAffected } from '@shared/models/skill.model';
import { Statistic } from '@shared/models/statistic.model';
import { GlobalService } from '@shared/services/global.service';
import { Subscription } from 'rxjs';

export interface SkillDialogData {
  skill: Skill | null | undefined;
  readonly: boolean;
  statistics: Statistic[];
}

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html'
})
export class SkillDialogComponent implements OnDestroy {
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
  tableStats: StatAffected[] = [];

  step: number = 0;

  private subscriptions: Subscription[] = [];
  constructor(
    public globalService: GlobalService,
    public dialogRef: MatDialogRef<SkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SkillDialogData
  ) {
    this.initForm();
    this.initData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
        stats: this.tableStats
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

  public getStatName(statAffected: StatAffected): string {
    const stat = this.data.statistics.find((stat) => stat.id === statAffected.statId);
    return stat ? stat.name : '';
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

    const sub: Subscription = this.statsControl.valueChanges.subscribe((stats: Statistic[]) => {
      this.onStatChanges(stats);
    });
    this.subscriptions.push(sub);
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

  private onStatChanges(stats: Statistic[]) {
    if (!stats || stats.length === 0) {
      this.tableStats = [];
      return;
    }

    if (!this.tableStats || this.tableStats.length === 0) {
      this.tableStats = this.mapStats(stats);
      return;
    }

    if (this.tableStats.length > stats.length) {
      this.tableStats = this.tableStats.filter((skillStat) =>
        stats.some((stat) => stat.id === skillStat.statId)
      );
      return;
    }

    const addedStats: Statistic[] = stats.filter((stat) =>
      this.tableStats.every((skillStat) => stat.id !== skillStat.statId)
    );
    this.tableStats = [...this.tableStats, ...this.mapStats(addedStats)];
  }

  private mapStats(stats: Statistic[]): StatAffected[] {
    return stats.map((stat) => {
      return {
        statId: stat.id,
        value: 0
      };
    });
  }
}
