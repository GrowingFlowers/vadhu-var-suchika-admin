import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReusableDialogsComponent } from '../../../Shared/reusable-dialogs/reusable-dialogs.component';

@Injectable({
  providedIn: 'root'
})
export class ReusableDialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(title: string, fields: any[]) {
    return this.dialog.open(ReusableDialogsComponent, {
      width: '600px', // Set width for medium size
      maxWidth: '90vw', // Ensures responsiveness on smaller screens
      autoFocus: false,
      data: { title, fields }
    }).afterClosed();
  }
}
