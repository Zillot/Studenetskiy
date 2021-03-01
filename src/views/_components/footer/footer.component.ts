import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowAndHideByOpacity } from 'src/helpers/animations';
import { AllService } from 'src/services/allService';
import { BasePage } from 'src/views/basePage.component';

@Component({
  selector: 'footer-partial',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [ShowAndHideByOpacity]
})
export class FooterComponent extends BasePage implements OnInit {

  constructor(
    private router: Router,
    protected activatedRoute: ActivatedRoute,
    protected allService: AllService) {
      super(activatedRoute, allService);
  }

  public ngOnInit(): void {
    
  }
}
