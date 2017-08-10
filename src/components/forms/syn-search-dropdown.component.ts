import {Component, Input, Output, ViewChild, EventEmitter, ElementRef, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


const SYN_SEARCH_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SynSearchDropdownComponent),
    multi: true
};

export interface SynItem {
    id: string;
    label: string;
}

@Component({
    selector: 'syn-search-dropdown',
    template: `
        <div dropdown
             class="syn-select-dropdown"
             [class.disabled]="disabled"
             (onToggle)="toggled($event)">

            <a dropdownToggle
               type="button"
               class="dropdown-toggle">
               
               <span *ngIf="!isOpen">
                {{selected}}
               </span>

               <input #search
                      [style.display]="!isOpen ? 'none': 'inherit'"
                      type="text"
                      placeholder="Search"
                      (keyup)="filterItems($event.target.value)"/>

              <span class="sycon sycon-expand dropdown-icon"></span>
            </a>

            <ul class="syn-drop-menu">

              <li *ngIf="defaultItem">
                <a (click)="setSelected(defaultItem)"
                   class="dropdown-item">
                  {{defaultItem}}
                </a>
              </li>

              <li *ngFor="let item of filteredItems"
                  role="menuitem">
                  <a (click)="setItemSelected(item)"
                    class="dropdown-item">
                    {{item.label}}
                  </a>
              </li>
            </ul>
        </div>
    `,
    providers: [
        SYN_SEARCH_DROPDOWN_CONTROL_VALUE_ACCESSOR
    ],
})

export class SynSearchDropdownComponent implements ControlValueAccessor {

    items: SynItem[] = [];
    filteredItems: SynItem[] = [];
    selected: any;
    isOpen: boolean;

    @Input()
    set options(options: string[] | SynItem[]) {

        if (typeof(options[0]) === 'object') {
            this.items = <SynItem[]>options;
        } else {
            // Convert from string array to SynItem
            this.items = (<string[]>options).map(item => {
                return {
                    id: item,
                    label: item
                }
            });
        }
        this.filteredItems = this.items;
    };

    @Input() disabled: boolean = false;
    @Input() defaultItem: string;
    @Output('selected') onSelected: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('search') private inputEle: ElementRef;

    /* emits to outside world (ngModel) */
    onChange = (_: any) => {
    };
    onTouched = () => {
    };

    toggled(event: any) {
        this.isOpen = event;
        this.onTouched();
        if (event) {
            /* Needed as display:none will not gain focus */
            setTimeout((_: any) => {
                this.inputEle.nativeElement.focus();
            });
        }
    }

    filterItems(search: string) {
        this.filteredItems = this.items.filter((item: SynItem) => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
        });
    }

    setItemSelected(item: SynItem) {
        this.selected = item.label;
        this.onChange(item.id);
        this.onSelected.emit(item);
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    /* Sets selected label from [ngModel] (which is the ID of an option) */
    writeValue(value: any) {
        let hasItem = this.items.some((item: SynItem) => {
            if (item.id == value) {
                this.selected = item.label;
                return true;
            }
            return false;
        });
        if (value != null && !hasItem) {
            console.warn('[SynDropdown] The ngModel value does not correspond to any option\s id');
            this.selected = value;
        }
    }

}
