import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldComponent} from './field.component';
import {SynSearchDropdownComponent} from './syn-search-dropdown.component';
import {RadioButtonGroup, NgbRadio, NgbActiveLabel} from './radio-button-group';
import {CheckboxControlComponent} from './checkbox-control.component';
import {CheckboxListComponent} from './checkbox-list.component';
import {DropdownModule} from '../core/dropdown/dropdown.module';
import {DefaultFieldErrors} from './field-errors';
import {SynValueListComponent} from './value-list/value-list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


const FormComponents = [
    FormFieldComponent,
    SynSearchDropdownComponent,
    CheckboxControlComponent,
    CheckboxListComponent,
    RadioButtonGroup,
    NgbRadio,
    NgbActiveLabel,
    SynValueListComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule.forRoot()
    ],
    exports: [
        ...FormComponents
    ],
    declarations: [
        ...FormComponents
    ],
    providers: [
        {provide: 'fieldErrors' , useValue: DefaultFieldErrors}
    ],
})
export class SynFormsModule {

}
