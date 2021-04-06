import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowAndHideByOpacity } from 'src/helpers/animations';
import { AllService } from 'src/services/allService';
import { BasePage } from 'src/views/basePage.component';

@Component({
  selector: 'header-partial',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [ShowAndHideByOpacity]
})
export class HeaderComponent extends BasePage implements OnInit {

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected allService: AllService,
    protected router: Router) {
      super(activatedRoute, allService);
  }

  public ngOnInit(): void {

  }

  public microHeader: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    var value = event.srcElement.documentElement.scrollTop;//.document.documentElement.scrollTop);

    if (value > 100) {
      this.microHeader = true;
    }
    else if (value < 10) {
      this.microHeader = false;
    }
  }
}
