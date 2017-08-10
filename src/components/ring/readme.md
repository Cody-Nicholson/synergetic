### Usage
```typescript
import { RingModule } from '@synmetric/core';
// or
import { RingModule } from '@synmetric/core/ring/ring.module';

```
### Annotations
```typescript

// Ring Component
export class RingComponent {
    @Input() title: string;
    @Input() icon: string;
    @Input() color: string;
    @Input() value: number;  // Decimal Percentage ( >= 0 <= 1 )
}
```
