import {Component, ContentChild, ElementRef, Renderer, AfterContentInit} from '@angular/core';
import {SidebarNavComponent} from './nav.component';

@Component({
    selector: 'syn-sidebar-container',
    templateUrl: 'container.component.html',
    host: {
        '[class.syn-sidebar-container]': 'true',
    },
})
export class SynSidebarContainerComponent implements AfterContentInit {

    @ContentChild(SidebarNavComponent) sidenav: SidebarNavComponent;

    constructor(private element: ElementRef,
                private renderer: Renderer) {
    }

    private isSidenavOpen(side: SidebarNavComponent): boolean {
        return side != null && side.opened;
    }

    private setContainerClass(sidenav: SidebarNavComponent, bool: boolean): void {
        this.renderer.setElementClass(this.element.nativeElement, 'syn-sidenav-opened', bool);
    }

    ngAfterContentInit() {
        if (!this.sidenav) { return; }
        this.sidenav.onOpen.subscribe(() => this.setContainerClass(this.sidenav, true));
        this.sidenav.onClose.subscribe(() => this.setContainerClass(this.sidenav, false));
    }

    getMarginLeft() {
        return this.isSidenavOpen(this.sidenav) ? this.sidenav.width : 0;
    }

    getContentStyle() {
        return {
            marginLeft: `${this.getMarginLeft()}px`,
            //transform: `translate3d(${this._getPositionOffset()}px, 0, 0)`
        };
    }

}