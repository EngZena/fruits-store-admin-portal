import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  submitButtonLabel: string = 'submit';
  cancelButtonLabel: string = 'cancel';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.submitButtonLabel = this.data.submitButtonLabel;
    this.cancelButtonLabel = this.data.cancelButtonLabel;
    if (this.data.isDarkTheme == 'true') {
      this.dialogRef.addPanelClass('dark-theme');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
