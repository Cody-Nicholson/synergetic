import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'lift',
    templateUrl: './lift.component.html',
})
export class LiftComponent{

    @Input() value: number;

    @Input() benchmark: number;

    @Input() threshold: number = 0;

    @Input() size: 'sm' | 'lg' = 'sm';


    get lift(){
        if(this.value > this.benchmark){
            return (this.value - this.benchmark) / this.benchmark;
        }else{
            return -(this.benchmark - this.value) / this.value;
        }
    }

    constructor() {
    }

}
