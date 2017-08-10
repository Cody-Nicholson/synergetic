import {Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {pie, arc, Pie} from 'd3-shape';
import {interpolate} from 'd3-interpolate';
import {SvgGraphComponent} from '../core/svg-charts';


@Component({
    selector: 'ring',
    templateUrl: 'ring.component.html'
})
export class RingComponent extends SvgGraphComponent implements AfterViewInit {

    @Input() title: string;

    @Input() icon: string = '';

    @Input() color: string = '#7AB1CA';

    @Input() set value(val: any) {
        this.data = [1 - val, +val];
    }

    @ViewChild('container') container: ElementRef;

    display: number;
    pie: Pie<RingComponent, number>;
    arc: any;
    data: number[];
    center: number;
    arcs: any;
    rail: any;
    entry: any = {
        startAngle: Math.PI * 2,
        endAngle: Math.PI * 2,
    };

    get innerRadius(): number {
        return (this.height - 14) / 2;
    }

    get outerRadius(): number {
        return (this.height - 2) / 2;
    }

    constructor(element: ElementRef) {
        super();
        this.container = element;
    }

    ngAfterViewInit() {
        this.render();
    }

    ngOnChanges() {
        this.render();
    }

    init() {
        this.initContainer(this.container);
        this.height = 115;
        this.width = 115;
        this.margin = {left: 0, right: 0, top: 0, bottom: 0};
        this.buildSVG();
        this.chart = this.svg.append('g')
            .attr('transform', `translate(${this.outerRadius},${this.outerRadius})`);

        this.buildArcs();
    }

    update() {
        this.updateArcs();
    }

    buildArcs() {
        this.pie = pie<RingComponent, number>().sort(null);

        this.arc = arc()
            .innerRadius(this.innerRadius)
            .outerRadius(this.outerRadius);

        this.rail = this.chart.selectAll(".rail")
            .data(this.pie([1, 0]))
            .enter()
            .append('path')
            .attr('class', 'rail')
            .attr('d', this.arc)
            .style("fill", '#E2DFDE');

        this.arcs = this.chart.selectAll(".arc")
            .data(this.pie(this.data))
            .enter()
            .append('path')
            .attr('class', 'arc')
            .style("fill", (d: any, i: number) => {
                return i == 0 ? 'none' : this.color;
            })
            .attr("d", this.arc(this.entry))
            .each(function (d: any) { // this context is the d3 node
                this._current = {
                    data: d.data,
                    value: d.value,
                    startAngle: Math.PI * 2,
                    endAngle: Math.PI * 2
                };
            });

        this.transition(this.arcs)
            .duration(750)
            .attrTween("d", this.arcTween(this.arc));
    }

    updateArcs() {
        this.arcs.data(this.pie(this.data));

        this.transition(this.arcs)
            .duration(750)
            .attrTween("d", this.arcTween(this.arc));
    }

    arcTween(arc: any) {
        return function (angle: any) {
            let i = interpolate(this._current, angle);
            this._current = i(0);
            return function (t: number) {
                return arc(i(t));
            };
        }
    }

}