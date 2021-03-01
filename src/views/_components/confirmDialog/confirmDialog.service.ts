import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirmDialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {

    constructor(public dialog: MatDialog) {

    }

    public showDialog(header: string, text: string): MatDialogRef<ConfirmDialogComponent> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                header: header,
                text: text,
            },
            disableClose: true
        });

        return dialogRef;
    }

    public showDefaultDeleteDialog(): MatDialogRef<ConfirmDialogComponent> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                header: "Attention!",
                text: "deleteDefaultWaring",
            },
            disableClose: true
        });

        return dialogRef;
    }
}