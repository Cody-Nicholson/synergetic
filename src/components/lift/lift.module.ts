import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LiftComponent} from './lift.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LiftComponent
    ],
    exports: [
        LiftComponent
    ]
})
export class LiftModule {
}
