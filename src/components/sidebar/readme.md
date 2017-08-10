### Usage
```typescript
import { SidebarModule } from '@synergetic/core';
// or
import { SidebarModule } from '@synergetic/core/sidebar/sidebar.module';

```
### Annotations
```typescript
@Component({
    selector: 'syn-sidebar-selector',
})
export class SidebarSelectorComponent{
    @Input() heading: string;
    @Input() selected: string;
}

@Component({
    selector: 'syn-sidebar-selector-menu',
})
export class SidebarSelectorMenuComponent {
    @Input() items: SynMenuItem[];
    @Input() selected: string;
    @Input() type: string = 'change';
    @Output('selected') onSelected = new EventEmitter<SynMenuItem[]>();
}

@Component({
    selector: 'syn-sidebar-selector-dropdown',
})
export class SidebarSelectorDropdownComponent {
    @Input() items: SynMenuItem[];
    @Input() selected: string;
    @Input() searchPlaceholder: string;
    @Input() focusSearch: boolean;
    @Input() displaySearch: boolean;
    @Output('selected') onSelected = new EventEmitter<SynMenuItem>();
}

@Directive({
    selector: '[syn-sidebar-selectors]',
})
export class SidebarSelectorsDirective {
}



```
