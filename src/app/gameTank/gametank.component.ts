import { Injectable, Component, HostListener, OnInit } from '@angular/core'
import { interval } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()

@Component({
    selector: 'tank-game',
    templateUrl: './gametank.component.html',
    styleUrls: ['./gametank.component.css'],
    host: {
        class: 'col-md-12 col-sm-12 col-lg-12 max-width'
    }
})

export class TankComponent implements OnInit {
    styleCar: object
    radian:number = 100*Math.PI/180
    initDeg: number = 1
    xspeed: number = 5
    left: number = 0
    top: number = 0
    wCar: number = 20
    hCar: number = 36
    time: number = 1

    ngOnInit(): void {
        let t = setInterval(() => {
            this.initCar()
        }, 60 / 1000)
    }

    initCar() {
        this.styleCar = {
            position: 'absolute',
            left: this.left + 'px',
            top: this.top + 'px',
            width: this.hCar + 'px',
            height: this.wCar + 'px',
            transform: 'rotate(' + this.initDeg+ 'deg)'       
        }
    }
    @HostListener('document:keypress', ['$event'])
    eventKey(event) {
        if (event.key === 'a') {
            this.initDeg = this.initDeg - this.radian
            console.log('left',this.initDeg)
        }
        if (event.key === 'w') {
            this.top = this.top  +  Math.sin(this.initDeg) * this.xspeed
            this.left = this.left + Math.cos(this.initDeg) * this.xspeed
        }
        if (event.key === 'd') {
            this.initDeg = this.initDeg + this.radian
            console.log('right',this.initDeg)
        }
        if (event.key === 's') {
            this.left = this.left - Math.cos(this.initDeg) * this.xspeed
            this.top = this.top  -  Math.sin(this.initDeg) * this.xspeed

        }
    }
}