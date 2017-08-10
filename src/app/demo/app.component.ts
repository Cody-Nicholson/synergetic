import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    dataRows: any[] = [
        {
            id: 1,
            name: 'Fox News',
            clicks: 23,
        }, {
            id: 2,
            name: 'Fox Business',
            clicks: 45,
        }, {
            id: 3,
            name: 'CNN Money',
            clicks: 57,
        }
    ];
}
