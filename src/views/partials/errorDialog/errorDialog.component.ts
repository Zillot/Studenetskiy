import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-errorDialog',
  templateUrl: './errorDialog.component.html',
  styleUrls: ['./errorDialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  header: string; 
  text: string; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ErrorDialogComponent>) { 
      this.header = data.header;
      this.text = data.text;
    }

  public ngOnInit(): void {

  }

  public closeDialog() {
    this.dialogRef.close(false);
  }
}
