import {Component, Output, ElementRef, OnInit, Input, EventEmitter} from '@angular/core';
import {SynMenuItem, SynNavItem} from '../core/syn-api';

export class SynSidenavToggleResult {
    constructor(public type: 'open' | 'close', public animationFinished: boolean) {
    }
}

@Component({
    selector: 'sidebar-nav',
    templateUrl: 'nav.component.html',
    host: {
        '(transitionend)': 'onTransitionEnd($event)',
    }
})
export class SidebarNavComponent implements OnInit {

    private isOpen: boolean = true;

    @Input()
    get opened(): boolean {
        return this.isOpen;
    }

    set opened(v: boolean) {
        this.toggle(v);
    }

    @Input() items: SynNavItem[];

    @Output('open-start') onOpenStart = new EventEmitter<void>();

    @Output('open') onOpen = new EventEmitter<void>();

    @Output('close-start') onCloseStart = new EventEmitter<void>();

    @Output('close') onClose = new EventEmitter<void>();

    private toggleAnimationPromise: Promise<SynSidenavToggleResult> = null;
    private resolveToggleAnimationPromise: (animationFinished: boolean) => void = null;

    constructor(private elementRef: ElementRef) {
    }

    get width() {
        if (this.elementRef.nativeElement) {
            return this.elementRef.nativeElement.offsetWidth;
        }
        return 0;
    }

    toggle(isOpen: boolean = !this.opened): Promise<SynSidenavToggleResult> {
        // Shortcut it if we're already opened.
        if (isOpen === this.opened) {
            return this.toggleAnimationPromise ||
                Promise.resolve(new SynSidenavToggleResult(isOpen ? 'open' : 'close', true));
        }

        this.isOpen = isOpen;

        if (isOpen) {
            this.onOpenStart.emit();
        } else {
            this.onCloseStart.emit();
        }

        if (this.toggleAnimationPromise) {
            this.resolveToggleAnimationPromise(false);
        }
        this.toggleAnimationPromise = new Promise<SynSidenavToggleResult>(resolve => {
            this.resolveToggleAnimationPromise = animationFinished =>
                resolve(new SynSidenavToggleResult(isOpen ? 'open' : 'close', animationFinished));
        });
        return this.toggleAnimationPromise;
    }

    onTransitionEnd(transitionEvent: TransitionEvent) {
        if (transitionEvent.target == this.elementRef.nativeElement
            && transitionEvent.propertyName.endsWith('transform')) {
            if (this.opened) {
                this.onOpen.emit();
            } else {
                this.onClose.emit();
            }

            if (this.toggleAnimationPromise) {
                this.resolveToggleAnimationPromise(true);
                this.toggleAnimationPromise = this.resolveToggleAnimationPromise = null;
            }
        }
    }

    ngOnInit() {
    }
}