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

  public beforeAfterList: string[] = [
    "../../assets/beforeAfter/img1.JPG",
    "../../assets/beforeAfter/img2.JPG",
    "../../assets/beforeAfter/img3.JPG",
    "../../assets/beforeAfter/img4.JPG",
    "../../assets/beforeAfter/img5_1.JPG",
    "../../assets/beforeAfter/img5_2.JPG",
    "../../assets/beforeAfter/img5_3.JPG",
    "../../assets/beforeAfter/img6.JPG"
  ]

  public ngOnInit(): void {
    
  }
}
