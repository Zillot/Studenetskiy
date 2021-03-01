import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowAndHideByHeight } from 'src/helpers/animations';

@Component({
  selector: 'pnPaginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  animations: [ShowAndHideByHeight]
})
export class PaginatorComponent implements OnInit {
  @Input() page: number;
  @Input() maxPages: number;
  @Output() pageChange = new EventEmitter<any>();

  public get strPage(): string {
    return this.page + '';
  }
  public visiblePages: string[];

  constructor() { 
  }

  public ngOnInit(): void {
    if (this.maxPages == null) {
      this.maxPages = 0;
    }

    this.updateVisiblePages();
  }

  public goTo(item: string) {
    this.page = parseInt(item);
    this.pageChange.emit(this.page);

    this.updateVisiblePages();
  }

  public left(): void { 
    if (this.page > 1) {
      this.page--;
      this.pageChange.emit(this.page);
    }

    this.updateVisiblePages();
  }

  public right(): void {
    if (this.page < this.maxPages) {
      this.page++;
      this.pageChange.emit(this.page);
    }

    this.updateVisiblePages();
  }

  public updateVisiblePages(): void {
    this.visiblePages = [];
    this.visiblePages.push("1");
    
    if (this.maxPages <= 8) {
      for (let i = 2; i <= this.maxPages; i++) {
        this.visiblePages.push(i + "");
      }
      
      return;
    }

    if (this.page >= 5) {
      this.visiblePages.push("...");
    }

    for (let i = -2; i < 3; i++) {
      if ((this.page + i) <= this.maxPages && (this.page + i) > 1) {
        this.visiblePages.push((this.page + i) + "");
      }
    }
    
    if (this.maxPages - this.page > 3) {
      this.visiblePages.push("...");
    }
    
    if (this.maxPages - this.page > 2) {
      this.visiblePages.push(this.maxPages + "");
    }
  }
}
