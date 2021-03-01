import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'generic-dropdown',
  template: `
    <ng-container *cdkPortal>
      <ng-content></ng-content>
    </ng-container>`
})
export class DropdownComponent {
  @Input()
  reference: HTMLElement;

  @ViewChild(CdkPortal)
  private portal: CdkPortal;

  protected overlayRef: OverlayRef;

  showing = false;

  onHideEvent: any;

  constructor(protected overlay: Overlay) {
  }

  show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.portal);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => {
      if (this.onHideEvent != null) {
        this.onHideEvent();
      }

      this.hide()
    });
    this.showing = true;
  }

  hide() {
    if (this.overlayRef != null) {
      this.overlayRef.detach();
      this.overlayRef = null;
      this.showing = false;
    }
  }

  @HostListener('window:resize')
  onWinResize() {
    this.syncWidth();
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([{
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }, {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
      }]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      maxHeight: "300px",
      minWidth: "150px",
    });
  }

  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }

    const refRect = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }
}
