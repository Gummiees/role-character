import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface BasicDialogData {
  header: string;
  body: string;
}

@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.scss'],
})
export class BasicDialog {
  constructor(
    public dialogRef: MatDialogRef<BasicDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BasicDialogData
  ) {}
}
