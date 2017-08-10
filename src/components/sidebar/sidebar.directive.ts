import {Directive, OnInit} from '@angular/core';

@Directive({
    selector: '[syn-sidebar]',
    host: {
        'class': 'syn-sidebar syn-sidebar-default'
    }
})
export class SidebarDirective{
    constructor() {}
}