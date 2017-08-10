### Usage
```typescript
import { SynFormsModule } from '@synergetic/core';
// or
import { SynFormsModule } from '@synergetic/core/forms/forms.module';

```

Each form component implements Angular Forms' ControlValueAccessor.  This allows seamless integration with the existing angular FormsModule and/or ReactiveFormsModule
Basic knowledge of Angular Forms is needed to properly use these components. 
See [Forms Guide](https://angular.io/docs/ts/latest/guide/forms.html) and [Dynamic Forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html) to get the most out of synergetic Forms.

### Annotations
```typescript

// Checkbox Component
@Component({
    selector: 'checkbox-control'
})
export class CheckboxControlComponent {
    @Input() label: string;
}

// Checkbox List Interface
export interface CheckboxOption {
    id: any;
    label: string;
    checked?: boolean; //private to checkbox list
}

// Checkbox List Component
@Component({
    selector: 'checkbox-list'
})
export class CheckboxListComponent {
    @Input() options: CheckboxOption[];
}

// Radio Group Directive - Required container for radio buttons 
@Directive({
    selector: '[radioButtonGroup]'
})

// Radio Button
@Directive({
    selector: 'input[type=radio]:not([notGrouped])'
})
export class NgbRadio {
    @Input() value: string;
}

// Syn Dropdown Item Interface
export interface SynItem {
    id: string;
    label: string;
}

/* Searchable Dropdown Menu 
*  - Takes a list of SynItem or strings (will convert strings to SynItems)
*  - Upon selecting an item, assigns SynItem.id to the form value
*  - Outputs SynItem on selection (selected)
* */
@Component({
    selector: 'syn-search-dropdown'
})
export class SynSearchDropdownComponent {
    @Input() options: SynItem[]; // list of items to be selected
    @Input() defaultItem: string; // Default item to be displayed at the top of the list
    @Output('selected') onSelected; // Outputs SynItem on selecting an item
    
}


```
