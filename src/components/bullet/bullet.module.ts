import {NgModule} from '@angular/core';
import {BulletComponent}   from './bullet.component';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [CommonModule],
    exports: [BulletComponent],
    declarations: [BulletComponent],
    providers: [],
})
export class BulletModule {
}
