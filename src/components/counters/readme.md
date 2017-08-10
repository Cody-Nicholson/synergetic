### Usage
```typescript
import { CounterModule } from '@synergetic/core';
// or
import { CounterModule } from '@synergetic/core/counters/counter.module';

```
### Annotations
```typescript

// Counter Directive
@Directive({
    selector: 'counter,[counter]'
})
export class CounterDirective implements OnInit, OnDestroy {
    @Input() countTo: number;
    @Input() countFrom: number;
    @Input() duration: string | number;
    
    @Output() count = new EventEmitter<number>();
}

```
