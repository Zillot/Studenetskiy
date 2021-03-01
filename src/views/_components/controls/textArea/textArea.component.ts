import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowAndHideByHeight } from 'src/helpers/animations';

@Component({
  selector: 'pnTextArea',
  templateUrl: './textArea.component.html',
  styleUrls: ['./textArea.component.scss'],
  animations: [ShowAndHideByHeight]
})
export class TextAreaComponent implements OnInit {
  @Input() errorText: string;
  @Input() placeholder: string;
  @Input() rows: number;
  @Input() cols: number;
  @Input() icon: string;
  @Input() mask: string;
  @Input() prefix: string;
  @Input() suffix: string;
  @Input() inputModel: any;
  @Input() disable: boolean;

  @Output() inputModelChange = new EventEmitter<any>();
  @Output() onKeyUp = new EventEmitter<any>();
  @Output() onIconClick = new EventEmitter<any>();
  @Output() onInputClick = new EventEmitter<any>();
  
  public focusedValue : boolean = false;
  public get focused() : boolean {
    return this.focusedValue || (this.inputModel != null && this.inputModel != "") || this.inputModel == "0";
  }

  constructor(
  ) { }

  public ngOnInit(): void {
    this.mask = !this.mask ? "" : this.mask;
    this.suffix = !this.suffix ? "" : this.suffix;
    this.prefix = !this.prefix ? "" : this.prefix;

    if (this.disable == null) {
      this.disable = false;
    }
  }

  public modelChanged() {
    this.inputModelChange.emit(this.inputModel);
  }

  public onFocus() {
    this.focusedValue = true;
  }

  public onBlur() {
    if (this.inputModel && this.inputModel.length > 0) {
      return;
    }

    this.focusedValue = false;
  }

  public onKey(event) {
    this.onKeyUp.emit(event);
    if (event.key == "Enter") {
      this.onIconClick.emit(this.inputModel);
    }
  }

  public click() {
    this.onIconClick.emit(this.inputModel);
  }


  public bigClick() {
    this.onInputClick.emit(this.inputModel);
  }
}
