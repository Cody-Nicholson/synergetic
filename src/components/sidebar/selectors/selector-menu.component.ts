import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SynMenuItem} from '../../core/syn-api';
import {Router} from '@angular/router';

@Component({
    selector: 'syn-sidebar-selector-menu',
    templateUrl: 'selector-menu.component.html'
})
export class SidebarSelectorMenuComponent implements OnInit {

    @Input() items: SynMenuItem[];
    @Input() selected: string;
    @Input() type: string = 'change';
    @Output('selected') onSelected = new EventEmitter<SynMenuItem[]>();

    select(item: SynMenuItem, subItem: SynMenuItem){
        this.onSelected.emit([item, subItem]);
    }

    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}