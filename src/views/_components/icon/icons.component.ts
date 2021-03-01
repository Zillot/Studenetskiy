import { Component, ChangeDetectionStrategy, Input, ElementRef, Optional, Inject } from "@angular/core";
import { IconsRegistry } from './icons.registry';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'icon',
    template: '<ng-content> </ng-content>',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsComponent {
    private svgIcon: SVGElement;

    @Input()
    set name(iconName: string) {
        if (this.svgIcon) {
           
            this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.IconsRegistry.getIcon(iconName);
        this.svgIcon = this.svgElementFromString(svgData);

        this.element.nativeElement.appendChild(this.svgIcon);
    }

    constructor(
        private element: ElementRef,
        private IconsRegistry: IconsRegistry,
        @Optional() @Inject(DOCUMENT) private document: any
    ) {

    }

    private svgElementFromString(svgContent: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = svgContent;
        return div.querySelector('svg') ||
            this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }
}