import { Component, OnInit, Input } from '@angular/core';
import { ShowAndHideByOpacity, ShowAndHideByOpacityWithDelay } from 'src/helpers/animations';

@Component({
  selector: 'isBusy',
  templateUrl: './isBusy.component.html',
  styleUrls: ['./isBusy.component.scss'],
  animations: [ShowAndHideByOpacityWithDelay, ShowAndHideByOpacity]
})
export class IsBusyComponent implements OnInit {
  @Input() show: boolean;
  @Input() manual: boolean;

  constructor() { }

  public ngOnInit(): void {
  }
}
