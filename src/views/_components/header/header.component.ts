import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  @ViewChild('navPanel') navPanel: ElementRef;
  public page: string;

  public navigationItems: any[] = [
    { text: "Shop", url: "/shop" },
    { text: "Help", url: "/help" },
    { text: "AboutUs", url: "/about" },
    { text: "Contact", url: "/contact" }
  ];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected allService: AllService,
    protected translateService: TranslateService,
    protected router: Router) {
      super(activatedRoute, allService);
      this.page = "";

      router.events.subscribe((val) => {
        if ((<any>val).url) {
          this.page = (<any>val).url;
        }
      });
  }
  
  @HostListener('window:scroll', ['$event'])
  public onScroll(event) {
    if (window.pageYOffset >= 285) {
      this.navPanel.nativeElement.style.position = "fixed";
      this.navPanel.nativeElement.style.top = '0px';
    }
    else {
      this.navPanel.nativeElement.style.position = "absolute";
      this.navPanel.nativeElement.style.top = '285px';
    }
  }

  ngAfterViewInit() {
    this.onScroll(null);
  }

  public ngOnInit(): void {
  }

  public isSelect(item: any) {
    var index00 = this.page.indexOf("/" + item.url + "?") == 0;
    var index11 = this.page.indexOf("/" + item.url + "/") == 0;
    var index2 = this.page.indexOf("/" + item.url);
    var index22 = index2 == this.page.length - item.url.length - 1 && index2 >= 0;

    return index00 || index11 || index22;
  }

  public goToLanguageSetups() {
    this.router.navigate(["languages"]);
  }

  public goToCurrenciesSetups() {
    this.router.navigate(["currencies"]);
  }

  public goToSocialsSetups() {
    this.router.navigate(["socials"]);
  }
}
