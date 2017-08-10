### Usage
```typescript
import { LiftModule } from '@synmetric/core';
// or
import { LiftModule } from '@synmetric/core/lift/lift.module';

```
### Annotations
```typescript

// Lift Component
export class LiftComponent{
    @Input() value: number;
    @Input() benchmark: number;
    @Input() threshold: number = 0;
    @Input() size: string = 'sm';
}
```
