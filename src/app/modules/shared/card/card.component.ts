import {Component, HostListener, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Data} from '../data.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    animations: [
        trigger('hover', [
            state('mouseenter', style({
                backgroundColor: '{{color}}',
                borderColor: '{{color}}',
                color: '#cecece'
            }), {params: {color: 'unset'}}),
            state('mouseleave', style({
                borderColor: '{{color}}',
            }), {params: {color: 'unset'}}),
            transition('* <=> *', animate('500ms'))
        ])
    ]
})
export class CardComponent {

    @Input()
    data: Data;
    hoverState = <string>'mouseleave';

    constructor() {
    }

    // Listening to mouseenter & mouseleave events for animations.
    @HostListener('mouseenter', ['$event'])
    @HostListener('mouseleave', ['$event'])
    onHover(event: MouseEvent) {
        this.hoverState = event.type;
    }

}
