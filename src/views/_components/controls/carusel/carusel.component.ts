import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowByLeftOffset, HideByRightOffset, ShowAndHideByOpacityQuick } from 'src/helpers/animations';

declare var $: any;

@Component({
  selector: 'npCarusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss'],
  animations: [ShowByLeftOffset, HideByRightOffset, ShowAndHideByOpacityQuick]
})
export class CaruselComponent implements OnInit {

  @Input() public imgs: string[];
  @Input() public selectedIndex: number;
  @Input() public video: string;
  
  public selectedBuffer: string;
  public saveAutoPlay: boolean;
  public isAutoPlay: boolean;

  public autoplayOp: any;

  public showFlag: boolean;

  constructor(
    private router: Router) {
      var mem = localStorage.getItem("autoplay");
      this.isAutoPlay = (mem == "true");
      this.startAutoplayIfNeed();
  }

  public ngOnInit(): void {

  }

  public startAutoplayIfNeed() {
    if (this.isAutoPlay) {
      if (this.autoplayOp) {
        clearTimeout(this.autoplayOp);
        this.autoplayOp = null;
      }

      this.autoplayOp = setTimeout(() => {
        if (!this.imgsList || this.imgsList.length <= 1) {
          return;
        }
  
        var index = this.safeSelectedIndex + 1;
        if (index >= this.imgsList.length) {
          index = 0;
        }
        this.clickOn(index);
      }, 6000);
    }
    else {
      clearTimeout(this.autoplayOp);
      this.autoplayOp = null;
    }
  }

  public get getNextAutoplayIndex() {
    var nextIndex = this.safeSelectedIndex + 1;
    if (nextIndex >= this.imgsList.length) {
      return 0;
    }
    return nextIndex;
  }

  public autoPlayChagned() {
    localStorage.setItem("autoplay", this.isAutoPlay + "");
    this.startAutoplayIfNeed();
  }

  public clickOn(index: number) {
    if (this.selectedBuffer || this.selectedIndex == index) {
      return;
    }

    this.selectedBuffer = this.selected;
    this.selectedIndex = index;
    
    this.startAutoplayIfNeed();

    setTimeout(() => {
      this.selectedBuffer = null;
    }, 300);
  }

  public get selected(): string {
    if (!this.imgsList) {
      return "";
    }

    if (!this.selectedIndex && this.imgsList.length > 0) {
      return this.imgsList[0];
    }

    if (!this.imgsList || this.imgsList.length == 0) {
      return "";
    }
    
    return this.imgsList[this.selectedIndex];
  }

  public get safeSelectedIndex(): number {
    if (!this.selectedIndex) {
      return 0;
    }
    
    return this.selectedIndex;
  }
  
  public hasScrollRight() {
    var val = $("#imgs").scrollLeft();
    var delta = $("#imgs").get(0).scrollWidth - $("#imgs").get(0).clientWidth;
    return val < delta && delta > 0;
  }

  public hasScrollLeft() {
    var val = $("#imgs").scrollLeft();
    return val > 0;
  }

  public scrollRight() {
    var val = $("#imgs").scrollLeft();
    $("#imgs").animate({ scrollLeft: val + 120 }, 100);
  }

  public scrollLeft() {
    var val = $("#imgs").scrollLeft();
    $("#imgs").animate({ scrollLeft: val - 120 }, 100);
  }

  public closeEventHandler() {
    this.isAutoPlay = this.saveAutoPlay;
    this.showFlag = false;
    this.startAutoplayIfNeed();
  }

  public showLightbox() {
    this.saveAutoPlay = this.isAutoPlay;
    this.isAutoPlay = false;
    this.showFlag = true;
    this.startAutoplayIfNeed();
  }

  public imgsListChache;

  public get imgsList() {
    var imgsList = this.imgs;

    if (this.video) {
      imgsList = ["https://img.youtube.com/vi/" + this.video + "/hqdefault.jpg"].concat(this.imgs)
    }

    if (this.imgsListChache == null || JSON.stringify(imgsList) != JSON.stringify(this.imgsListChache)) {
      this.imgsListChache = imgsList;
    }

    return this.imgsListChache;
  }

  public imageObjectChache;

  public get imageObject(): Array<object> {
    var map: object[] = this.imgs.map(x => {
      return <any>{
        image: x,
        thumbImage: x,
        title: ''
      };
    });

    if (this.video) {
      map = [<any>{
        video: "https://www.youtube.com/watch?v=" + this.video
      }].concat(map)
    }

    if (this.imageObjectChache == null || JSON.stringify(map) != JSON.stringify(this.imageObjectChache)) {
      this.imageObjectChache = map;
    }

    return this.imageObjectChache;
  }
}
