import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShowAndHideByHeight } from 'src/helpers/animations';

@Component({
  selector: 'pnListPicker',
  templateUrl: './listPicker.component.html',
  styleUrls: ['./listPicker.component.scss'],
  animations: [ShowAndHideByHeight]
})
export class ListPickerComponent implements OnInit {
  @Input() errorText: string;
  @Input() placeholder: string;
  @Input() valueKey: string;
  @Input() allOption: boolean;
  @Input() iconName: string;
  
  @Input() options: any[];
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
  @Output() selected = new EventEmitter<any>();

  public selectedValue: string;
  public selectedTransalted: string;

  constructor(
    private translateService: TranslateService
  ) { 
  }

  public ngOnInit(): void { 
    this.transalteSelected();
    
    this.translateService.onLangChange.subscribe(x => {
      this.transalteSelected();
    });
  }

  public transalteSelected() {
    if (this.inputModel != null) {  
      this.translateService
        .get(this.inputModel[this.valueKey])
        .subscribe(translation => {
          this.selectedTransalted = translation;
        });
    }
  }

  public modelChanged() {
    this.inputModelChange.emit(this.inputModel);
    this.selected.emit(this.inputModel);
    this.transalteSelected();
  }

  public onSelected(event) {
    this.inputModel = event.value;
    this.modelChanged();
  }

  public getValue(option: any) {
    return option[this.valueKey];
  }

  public get getOptions(): any[] {
    let ops = [];
    if (<any>this.allOption == 'true' || this.allOption == true) {
      let obj = {};
      obj[this.valueKey] = "Все";
      ops.push(obj);
    }

    if (this.options) {
      ops = ops.concat(this.options);
    }

    return ops;
  }
}
