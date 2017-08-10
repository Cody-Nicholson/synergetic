import {Component, TemplateRef, ContentChild, Input, TrackByFn} from '@angular/core';
import {SynTableComponent} from './syn-table.component';

@Component({
    selector: 'syn-tbody',
    template: `
         <ul class="tbody">
           <ng-content select="[title-row]"></ng-content>
           <li class="row"
               *ngFor="let row of rows; trackBy: trackByFn">
             <ul class="tr">
                <ng-template 
                  [ngTemplateOutlet]="rowTemplate"
                  [ngOutletContext]="{row: row}">
               </ng-template> 
             </ul>
          </li>
         </ul>
    `,
})

export class SynTableBodyComponent {

    trackByFn: TrackByFn;
    rows: Array<any> = [];

    @ContentChild(TemplateRef) rowTemplate: TemplateRef<Object>;

    constructor(table: SynTableComponent) {
        this.trackByFn = table.trackBy;
        table.addBody(this);
    }
}
