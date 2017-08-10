import {Directive, Input, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {timer} from 'd3-timer';
import {easeInOutExpo} from './easing';


@Directive({
    selector: 'counter,[counter]'
})

export class CounterDirective implements OnInit, OnDestroy {
    init: boolean;
    currentValue: number;
    private timer: any;
    private _countTo: number;
    private _countFrom: number;
    private _duration: number;

    constructor() {
        this.currentValue = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this._duration = 0;
        this.init = false;
    }

    @Output() count = new EventEmitter();

    @Input()
    set duration(duration) {
        this._duration = +duration;
    }

    get duration() {
        return this._duration;
    }

    @Input()
    set countTo(countTo: number) {
        this._countTo = +countTo;
        this._countFrom = this.currentValue;
        this.reset();
    }

    get countTo(): number {
        return this._countTo;
    }

    @Input()
    set countFrom(countFrom: number) {
        this._countFrom = +countFrom;
    }

    ngOnInit() {
        this.init = true;
        this.run();
    }

    ngOnDestroy() {
        if (this.timer) {
            this.timer.stop();
        }
    }

    reset() {
        if (this.init) {
            this.timer.stop();
            this.run();
        }
    }

    run() {
        this.timer = timer((elapsed) => {
            this.currentValue = easeInOutExpo(elapsed, this._countFrom, this._countTo - this._countFrom, this._duration);
            if (elapsed >= this._duration) {
                this.count.emit(this._countTo);
                this.currentValue = this._countTo;
                this.timer.stop();
            } else {
                this.count.emit(this.currentValue);
            }
        });
    }
}