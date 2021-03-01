import { Component, OnInit } from '@angular/core';
import { ShowAndHideByOpacity } from '../../helpers/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePage } from '../basePage.component';
import { AllService } from 'src/services/allService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ShowAndHideByOpacity]
})
export class HomeComponent extends BasePage implements OnInit {

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected allService: AllService,
    protected router: Router) {
      super(activatedRoute, allService);
  }

  public ngOnInit(): void {
    
  }
}
