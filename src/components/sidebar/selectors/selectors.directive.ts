import {Directive, OnInit} from '@angular/core';

@Directive({
    selector: '[syn-sidebar-selectors]',
    host: {
        'class': 'selectors'
    }
})
export class SidebarSelectorsDirective {
    constructor() {
    }
}