import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  BasicDialogComponent,
  BasicDialogData
} from '@shared/components/basic-dialog/basic-dialog.component';
import { BasicDialogModel } from '@shared/models/dialog.model';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(model: BasicDialogModel): Observable<any> {
    const data: BasicDialogData = {
      header: model.header,
      body: model.body
    };
    const dialogRef = this.dialog.open(BasicDialogComponent, {
      width: model.width ?? '500px',
      data: data
    });

    return dialogRef.afterClosed().pipe(
      first(),
      filter((result) => !!result)
    );
  }
}
