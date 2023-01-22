import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Injectable } from '@angular/core';

const snackBarConfig: MatSnackBarConfig = {
  duration: 2000,
  horizontalPosition: 'end',
  verticalPosition: 'bottom',
};

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  error(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['snackbar-error'],
      ...snackBarConfig,
    });
  }

  success(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['snackbar-success'],
      ...snackBarConfig,
    });
  }

  info(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['snackbar-info'],
      ...snackBarConfig,
    });
  }
}
