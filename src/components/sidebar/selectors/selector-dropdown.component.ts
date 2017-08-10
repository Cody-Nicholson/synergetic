import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {SynMenuItem} from '../../core/syn-api';

@Component({
    selector: 'syn-sidebar-selector-dropdown',
    templateUrl: 'selector-dropdown.component.html'
})
export class SidebarSelectorDropdownComponent implements OnInit {

    private dropItems: SynMenuItem[];
    filteredItems: SynMenuItem[];
    private searchValue: string;

    @Input() set items(items: SynMenuItem[]) {
        this.dropItems = items;
        this.filterItems(this.searchValue);
    }
    @Input() selected: string;
    @Input() searchPlaceholder: string;
    @Input() focusSearch: boolean;
    @Input() displaySearch: boolean;

    @Output('selected') onSelected = new EventEmitter<SynMenuItem>();

    @ViewChild('dropsearch') searchBox: ElementRef;

    constructor() {
        this.searchValue = '';
        this.focusSearch = true;
        this.displaySearch = true;
        this.searchPlaceholder = 'Search';
    }

    /* Focus search after */
    toggle(event: any) {
        if (event && this.focusSearch) {
            /* Needed as display:none will not gain focus */
            setTimeout((_: any) => {
                this.searchBox.nativeElement.focus();
            })
        }
    }

    filterItems(search: string) {
        this.searchValue = search;
        if (!search) {
            this.filteredItems = this.dropItems;
        } else {
            this.filteredItems = this.dropItems.filter((item: SynMenuItem) => {
                return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
            });
        }
    }

    select(item: SynMenuItem) {
        this.onSelected.emit(item);
    }

    ngOnInit() {
    }

}