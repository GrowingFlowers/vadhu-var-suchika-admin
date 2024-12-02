import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToasterComponent } from '../../../Shared/toaster/toaster.component';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSuccessSnackBar(message: string) {
    this._snackBar.openFromComponent(ToasterComponent, {
      data: {
        message: message,
        icon: 'done',
        snackBar: this._snackBar
      },
      panelClass: 'success-snackbar',
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  openErroSnackBar(message: string) {
    this._snackBar.openFromComponent(ToasterComponent, {
      data: {
        message: message,
        icon: 'report_problem',
        snackBar: this._snackBar
      },
      panelClass: 'error-snackbar',
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }


}
