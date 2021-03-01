import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from './errorDialog.component';

@Injectable({ providedIn: 'root' })
export class ErrorDialogService {

    constructor(public dialog: MatDialog) {

    }

    public showDialog(header: string, text: string): MatDialogRef<ErrorDialogComponent> {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: {
                header: header, 
                text: text
            },
            disableClose: true
        });

        return dialogRef;
    }

    public showUnknownErrorDialog(error): MatDialogRef<ErrorDialogComponent> {
        return this.showDialog("Oops", error);
    }
}