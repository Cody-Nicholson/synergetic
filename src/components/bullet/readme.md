### Usage
```typescript
import { BulletModule } from '@synergetic/core';
// or
import { BulletModule } from '@synergetic/core/bullet/bullet.module';

```
### Annotations
```typescript

// Bullet Chart Component
export class BulletComponent {
    @Input() max: number;
    @Input() value: number;
    @Input() benchmark: number;
    @Input() threshold: number;
   }

```
