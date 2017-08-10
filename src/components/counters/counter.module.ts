import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterDirective } from './counter.directive';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        CounterDirective
    ],
    exports: [
        CounterDirective
    ],
})
export class CounterModule { }