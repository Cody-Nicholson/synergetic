import {NgModule} from '@angular/core';
import {SidebarDirective} from './sidebar.directive';
import {SidebarSelectorComponent} from './selectors/selector.component';
import {SidebarSelectorsDirective} from './selectors/selectors.directive';
import {SidebarSelectorMenuComponent} from './selectors/selector-menu.component';
import {SidebarSelectorDropdownComponent} from './selectors/selector-dropdown.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidebarNavComponent} from './nav.component';
import {DropdownModule} from '../core/dropdown/dropdown.module';

@NgModule({
    imports: [
        DropdownModule.forRoot(),
        CommonModule,
        RouterModule,
    ],
    declarations: [
        SidebarDirective,
        SidebarSelectorComponent,
        SidebarSelectorsDirective,
        SidebarSelectorMenuComponent,
        SidebarSelectorDropdownComponent,
        SidebarNavComponent,
    ],
    exports: [
        SidebarDirective,
        SidebarSelectorComponent,
        SidebarSelectorsDirective,
        SidebarSelectorMenuComponent,
        SidebarSelectorDropdownComponent,
        SidebarNavComponent,
    ],
})
export class SidebarModule {
}
