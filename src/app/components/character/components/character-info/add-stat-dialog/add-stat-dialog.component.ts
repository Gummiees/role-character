import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Statistic } from '@shared/models/statistic.model';
import { ValidatorsService } from '@shared/services/validators.service';

@Component({
  selector: 'app-add-stat-dialog',
  templateUrl: './add-stat-dialog.component.html'
})
export class AddStatDialogComponent {
  form: FormGroup = new FormGroup({});
  abvControl: FormControl = new FormControl(null, [Validators.required]);
  nameControl: FormControl = new FormControl(null, [Validators.required]);
  totalControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  currentControl: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  constructor(
    public dialogRef: MatDialogRef<AddStatDialogComponent>,
    private validatorsService: ValidatorsService
  ) {
    this.form = new FormGroup(
      {
        abv: this.abvControl,
        name: this.nameControl,
        total: this.totalControl,
        current: this.currentControl
      },
      this.validatorsService.exceedsTotal('current', 'total')
    );
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const stat: Statistic = this.form.value as Statistic;
      this.dialogRef.close(stat);
    }
  }
}
