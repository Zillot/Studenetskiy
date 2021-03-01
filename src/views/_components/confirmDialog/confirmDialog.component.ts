import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IsBusyService } from 'src/services/isBusy.service';
import { ConfirmDialogService } from './confirmDialog.service';

@Component({
  selector: 'app-confirmDialog',
  templateUrl: './confirmDialog.component.html',
  styleUrls: ['./confirmDialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {

  header: string; 
  text: string; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public isBusyService: IsBusyService,
    public dialogRef: MatDialogRef<ConfirmDialogService>) { 
      this.header = data.header;
      this.text = data.text;
    }

  public ngOnInit(): void {
  }

  public closeDialog() {
    this.dialogRef.close(false);
  }

  public confrim() {
    this.dialogRef.close(true);
  }
}
