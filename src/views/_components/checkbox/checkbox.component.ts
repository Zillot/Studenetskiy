import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pnCheckbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  animations: []
})
export class CheckboxComponent implements OnInit {
  @Input() public text: string;
  
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
