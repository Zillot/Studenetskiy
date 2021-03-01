import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from 'src/views/partials/confirmDialog/confirmDialog.service';
import { ErrorDialogService } from 'src/views/partials/errorDialog/errorDialogService';

@Injectable({ providedIn: 'root' })
export class AllService {
  constructor(
    public router: Router,
    public errorDialogService: ErrorDialogService,
    public confirmDialogService: ConfirmDialogService,
    public translateService: TranslateService) {
  }
}