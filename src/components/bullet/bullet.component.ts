import {Component, Input, HostBinding} from '@angular/core';

@Component({
    selector: 'bullet',
    template: `
        <div class="bar"
             [ngClass]="barStatus"
             [style.width]="barWidth">
        </div>
        <div class="benchmark"
             [style.left]="benchWidth">
        </div>
    `,
})

export class BulletComponent {

    private thresh: number = .25;

    @HostBinding('class.bullet') bullet = true;
    @Input() max: number;
    @Input() value: number;
    @Input() benchmark: number;

    @Input() set threshold(val: number | string) {
        this.thresh = +val;
    };

    get barWidth(): string {
        let width = 100 * this.value / this.max;
        return Math.min(width, 100) + '%';
    }

    get benchWidth(): string {
        let width = 100 * this.benchmark / this.max;
        return Math.min(width, 100) + '%';
    }

    get barStatus(): string {
        let change: number;

        if (this.value > this.benchmark) {
            change = this.value / this.benchmark - 1;
        } else {
            change = 1 - this.benchmark / this.value;
        }

        if (change >= this.thresh) {
            return 'good'
        }
        if (-change >= this.thresh) {
            return 'bad'
        }
        return 'normal';
    }
}