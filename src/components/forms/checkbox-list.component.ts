import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {CheckboxOption} from '../core/syn-api';

const CB_LIST_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxListComponent),
    multi: true
};

@Component({
    selector: 'checkbox-list',
    template: `
        <div class="checkbox-group">
            <label *ngFor="let option of _options"
                   (blur)="onTouched()"
                   (click)="selectOption($event, option)">

                <input type="checkbox"
                    [checked]="option.checked">

                <div class="checkbox-square">
                </div>

                <span class="checkbox-label">
                    {{option.label}}
                </span>
            </label>
        </div>
    `,
    providers: [
        CB_LIST_ACCESSOR
    ],
})

export class CheckboxListComponent implements ControlValueAccessor{

    _options: CheckboxOption[];

    @Input() set options(options: CheckboxOption[]){
        this._options = options;
    }

    /* emits to outside world (ngModel) */
    onChange = (_: any) => {};
    onTouched = () => {};

    selectOption(event: any, option: CheckboxOption){
        event.preventDefault();
        this.onTouched();
        option.checked = !option.checked;
        let values = this._options.filter(option => option.checked)
            .map(option => option.id);

        this.onChange(values);
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    /* Sets selected from [ngModel] */
    writeValue(value: any) {
        value = value || [];
        for(let option of this._options){
            option.checked = value.indexOf(option.id) > -1;
        }
    }

}
