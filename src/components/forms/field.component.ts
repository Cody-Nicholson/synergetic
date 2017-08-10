import {Component, Input, ContentChild, Inject} from '@angular/core';
import {FormControlName} from '@angular/forms';


@Component({
    selector: 'field',
    template: `
    <div class="form-group"
         [ngClass]="{
             'has-error': isInvalid
         }">

      <label class="control-label" 
              *ngIf="label" for="for">
        {{label}}
      </label>

      <div>
        <ng-content></ng-content>

        <span *ngIf="isInvalid" 
              class="help-block text-danger">
              
          <div *ngFor="let err of errors">
            {{errors}}
          </div> 
             
        </span>

      </div>
    </div>
  `,
})

export class FormFieldComponent {
    @Input() label: string;
    @ContentChild(FormControlName) control: FormControlName;

    get isInvalid() {
        return this.control && !this.control.valid && this.control.touched;
    }

    constructor(@Inject('fieldErrors') private fieldErrors: any){
    }

    get errors(){
        return Object.keys(this.control.errors)
            .map(key => {
                let error: any = this.fieldErrors[key];
                if(typeof error === 'string'){
                    return error;
                }
                let errorDict: any = this.control.errors[key] || {};
                return error(errorDict);
            });
    }

}