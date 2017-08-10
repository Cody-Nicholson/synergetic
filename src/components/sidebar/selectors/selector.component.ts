import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'syn-sidebar-selector',
    templateUrl: 'selector.component.html'
})
export class SidebarSelectorComponent implements OnInit {

    @Input() heading: string;
    @Input() selected: string;

    constructor() {
    }

    ngOnInit() {
    }

}