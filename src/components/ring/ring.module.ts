import {NgModule} from '@angular/core';
import {RingComponent}   from './ring.component';
import {CommonModule} from '@angular/common';
import {CounterModule} from '../counters/counter.module';


@NgModule({
    imports: [
        CommonModule,
        CounterModule
    ],
    exports: [
        RingComponent
    ],
    declarations: [
        RingComponent
    ],
})
export class RingModule {
}
