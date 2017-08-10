import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxControlComponent),
    multi: true
};

@Component({
    selector: 'checkbox-control',
    template: `
        <div class="checkbox-group">
            <label [class.disabled]="isDisabled"
                   (blur)="onTouched()"
                   (click)="toggle($event)">

                <input type="checkbox"
                    [disabled]="isDisabled"
                    [checked]="checked">

                <div class="checkbox-square">
                </div>

                <span class="checkbox-label">
                    {{label}}
                </span>

            </label>
        </div>
    `,
    providers: [
        CHECKBOX_CONTROL_VALUE_ACCESSOR
    ],
})

export class CheckboxControlComponent implements ControlValueAccessor{

    @Input() label: string;

    checked: boolean;
    isDisabled: boolean;

    /* emits to outside world (ngModel) */
    onChange = (_: any) => {};
    onTouched = () => {};

    toggle(event: any){
        this.onTouched();
        event.preventDefault();
        if(this.isDisabled){
            return
        }
        this.checked = !this.checked;
        this.onChange(this.checked);
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    /* Sets selected from [ngModel] */
    writeValue(value: any) {
        this.checked = value;
    }

    setDisabledState(isDisabled: boolean): void{
        this.isDisabled = isDisabled;
    }

}
