import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowAndHideByHeight } from 'src/helpers/animations';

@Component({
  selector: 'pnDatePicker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.scss'],
  animations: [ShowAndHideByHeight]
})
export class DatePickerComponent implements OnInit {
  @Input() placeholder: string;
  @Input() errorText: string;
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
  
  constructor(
  ) { }

  public ngOnInit(): void {
    
  }

  public get selectedString() {
    if (!this.inputModel) {
      return "";
    }

    var d = this.inputModel;
    return `${this.zeroBased(d.getDate())}.${this.zeroBased(d.getMonth() + 1)}.${d.getFullYear()}`
  }

  public modelChanged() {
    this.inputModelChange.emit(this.inputModel);
  }

  public zeroBased(val: number) {
    if (val < 10) {
      return "0" + val;
    }

    return val.toString();
  }
}
