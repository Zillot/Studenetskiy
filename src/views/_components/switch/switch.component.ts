import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pnSwitch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  animations: []
})
export class SwitchComponent implements OnInit {
  @Input() public checked: boolean;
  
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
  
  constructor(
  ) { }

  public ngOnInit(): void {
    
  }

  public modelChanged() {
    this.inputModelChange.emit(this.inputModel);
  }
}
