import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReusableDialogsComponent } from '../../../Shared/reusable-dialogs/reusable-dialogs.component';

@Injectable({
  providedIn: 'root'
})
export class ReusableDialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(title: string, fields: any[],elements: any) {
    return this.dialog.open(ReusableDialogsComponent, {
      width: '600px', 
      maxWidth: '90vw', 
      autoFocus: false,
      data: { title, fields, elements }
    }).afterClosed();
  }
}
