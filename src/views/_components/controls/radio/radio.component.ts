import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pnRadio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  animations: []
})
export class RadioComponent implements OnInit {
  @Input() public text: string;
  @Input() public name: string;
  @Input() public value: string;
  
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
  
  constructor(
  ) { }

  public ngOnInit(): void {
    if (!this.text) {
      this.text = "-";
    }
  }

  public modelChanged() {
    this.inputModelChange.emit(this.inputModel);
  }
}
