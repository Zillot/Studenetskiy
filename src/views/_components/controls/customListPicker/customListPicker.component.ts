import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ShowAndHideByHeight } from 'src/helpers/animations';
import { DropdownComponent } from './dropdown.component';

@Component({
  selector: 'customListPicker',
  templateUrl: './customListPicker.component.html',
  styleUrls: ['./customListPicker.component.scss'],
  animations: [ShowAndHideByHeight]
})
export class CustomListPickerComponent implements OnInit {
  @ViewChild('dropdownElement') dropdownElement: ElementRef;
  @ViewChild(DropdownComponent) dropdown: DropdownComponent;
  
  @Input() options: any[];
  @Input() valueKey: string;
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();
  
  constructor() { 
  }

  public ngOnInit(): void {
  }

  public getOptionValue(option: any) {
    return option[this.valueKey == null ? "key" : this.valueKey];
  }

  public optionClick(option: any) {
    this.inputModel = option;
    this.inputModelChange.emit(this.inputModel);
    this.change.emit(this.inputModel);
    this.closeDropdown();
  }

  showDropdown() {
    this.dropdown.show();
  }

  closeDropdown() {
    this.dropdown.hide();
  }
}
