import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'pnPriceRange',
  templateUrl: './priceRange.component.html',
  styleUrls: ['./priceRange.component.scss'],
  animations: []
})
export class PriceRangeComponent implements OnInit {
  @ViewChild("start", { static: true }) startPoint: ElementRef;
  @ViewChild("end", { static: true }) endPoint: ElementRef;
  @ViewChild("line", { static: true }) line: ElementRef;
  @ViewChild("lineHi", { static: true }) lineHi: ElementRef;
  
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<any>();
  
  @Input() inputModelPer: any;
  @Output() inputModelPerChange = new EventEmitter<any>();

  @Input() public start: number;
  @Input() public end: number;

  public get startToShow(): number {
    return Math.floor(this.start + this.end * (this.startToUse / this.width));
  }
  public get endToShow(): number {
    return Math.floor(this.end * (this.endToUse / this.width));
  }

  public get startPer(): number {
    return this.startVal / this.width;
  }
  public get endPer(): number {
    return this.endVal / this.width;
  }

  private static max = 200;

  public get startToUse(): number {
    return this.startVal + this.startDelta;
  }
  public get endToUse(): number {
    return this.endVal + this.endDelta;
  }

  public startVal: number = 0;
  public endVal: number = 0;
  public dragPositionStart: any;
  public dragPositionEnd: any;
  
  public startDelta: number = 0;
  public endDelta: number = 0;

  public get width(): number {
    return this.line.nativeElement.scrollWidth - 15;
  }
  
  constructor(
  ) { }

  public ngOnInit(): void {
    this.endVal = this.width;
    this.endPoint.nativeElement.style.left = this.endVal + "px";
    
    this.inputModelPer = { min: this.startPer, max: this.endPer };
    this.inputModelPerChange.emit(this.inputModelPer);

    this.inputModel = { min: this.startToShow, max: this.endToShow };
    this.inputModelChange.emit(this.inputModel);
  }

  public modelChanged() {
    this.inputModelPerChange.emit(this.inputModelPer);
    this.inputModelChange.emit(this.inputModel);
  }
 
  public eventMovedHandler(event, index) {
    if (index == 0) {
      this.startDelta = event.distance.x;
    }
    if (index == 1) {
      this.endDelta = event.distance.x;
    }

    this.lineHi.nativeElement.style.left = this.startToUse + "px";
    this.lineHi.nativeElement.style.width = (this.endToUse - this.startToUse) + "px";

    if (index == 1 && this.startToUse > this.endToUse) {
      var val = this.startVal - this.endToUse;
      this.startPoint.nativeElement.style.left = (-val) + "px";
      this.startDelta = -val;
    }

    if (index == 0 && this.startToUse > this.endToUse) {
      var val = this.endVal - this.startToUse;
      this.endPoint.nativeElement.style.left = (this.width - val) + "px";
      this.endDelta = -val;
    }
  }
 
  public eventEndedHandler(event, index) {
    if (index == 0) {
      this.startDelta = 0;
      this.startVal += event.distance.x;

      if (this.startVal > this.width) {
        this.startVal = this.width;
      }
      if (this.startVal < 0) {
        this.startVal = 0;
      }
      
      this.endVal += this.endDelta;
      this.endDelta = 0;
      this.dragPositionEnd = {x: -(this.width - this.endVal), y: 0} ;
      this.endPoint.nativeElement.style.transform = "translate3d(-" + (this.width - this.endVal) + "px, 0px, 0px)";
      this.endPoint.nativeElement.style.left = this.width + "px";
    }

    if (index == 1) {
      this.endDelta = 0;
      this.endVal += event.distance.x;

      if (this.endVal > this.width) {
        this.endVal = this.width;
      }
      if (this.endVal < 0) {
        this.endVal = 0;
      }

      this.startVal += this.startDelta;
      this.startDelta = 0;
      this.dragPositionStart = {x: this.startVal, y: 0} ;
      this.startPoint.nativeElement.style.transform = "translate3d(" + this.startVal + "px, 0px, 0px)";
      this.startPoint.nativeElement.style.left = "0px";
    }

    this.inputModel = { min: this.startToShow, max: this.endToShow };
    this.inputModelChange.emit(this.inputModel);

    this.inputModelPer = { min: this.startPer, max: this.endPer };
    this.inputModelPerChange.emit(this.inputModelPer);
  }
}
