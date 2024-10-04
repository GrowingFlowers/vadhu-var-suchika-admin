import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReusableDialogsComponent } from '../../../Shared/reusable-dialogs/reusable-dialogs.component';

@Injectable({
  providedIn: 'root'
})
export class ReusableDialogService {

  constructor(private dialog: MatDialog) {}

  openDialog(title: string, fields: any[], formValues: any = {}) {
    return this.dialog.open(ReusableDialogsComponent, {
      width: '400px',
      data: { title, fields, formValues }
    }).afterClosed();
  }
}
