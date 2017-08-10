import {Directive, Input, OnDestroy, HostBinding} from '@angular/core';
import {ParallelBarsDirective} from './parallel-bars.directive';

@Directive({
    selector: '[parallelBar]',
})
export class ParallelBarDirective implements OnDestroy {

    private val: number;

    @Input()
    set value(val: number) {
        this.val = +val;
        this.parallelBars.update(this);
    }

    get value() {
        return this.val;
    }

    @HostBinding('class.max-bar') isMax: boolean;

    @HostBinding('class.parallel-bar') barClass: boolean = true;

    @HostBinding('style.width') width: string;

    setWidth(width: number) {
        this.width = width + '%';
    };

    constructor(public parallelBars: ParallelBarsDirective) {
    }

    ngOnDestroy() {
        this.parallelBars.removeBar(this);
    }
}
