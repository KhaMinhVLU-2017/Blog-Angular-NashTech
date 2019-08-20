import { Injectable, Component, OnInit, HostListener } from '@angular/core'
import { SignalRService } from '../services/SignalRService.service'
import { UserService } from '../services/user.service'

@Injectable()

@Component({
  selector: 'game-app',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  host: {
    class: 'col-md-12 col-lg-12 col-sm-12'
  }
})

export class GameComponent implements OnInit {
  icar: object
  position: object
  radian: number = 100 * Math.PI / 180
  speed: number = 10
  crPoint: object
  initDeg: number = 0
  Hcar: number = 36
  Wcar: number = 20
  left: number = 0
  top: number = 0

  constructor(private _Signal: SignalRService, private _User: UserService) {
    this._Signal.onlineGameListener()
  }

  ngOnInit(): void {
    let t = setInterval(() => {
      this.initialCar()
    }, 60 / 1000)
    setTimeout(() => {
      let fullname = this._User.currentUser['fullname']
      if (fullname !== null) {
        let objectCar = {
          fullname,
          'width': this.Hcar,
          'height': this.Wcar,
          'position': 'absolute',
          'top':   '0',
          'left':  '0',
          'right': '0',
          'transform': this.initDeg
        }
        this._Signal.sendRegisterGame(objectCar)
      }
    }, 500)
  }
  initialCar() {
    this.position = {
      'top': this.top + 'px',
      'left': this.left + 'px',
      'transform': 'rotate(' + this.initDeg + 'deg)'
    }
    this.icar = {
      'width': this.Hcar + 'px',
      'height': this.Wcar + 'px',
      'position': 'absolute',
      ...this.position
    }
    this.crPoint = {
      height: this.Hcar / 2, // height
      width: this.Wcar / 2 // width
    }
  }

  // Click add Class
  eventClick(e) {
    let wdgame = document.getElementById('wdgame')
    if (wdgame.contains(e.target)) {
      wdgame.classList.add('main-bg-active')
    } else {
      wdgame.classList.remove('main-bg-active')
    }
  }

  //Control event
  @HostListener('document:keypress', ['$event'])
  controlEvent(e) {
    //left 37 97
    //Up 38 119
    //Right 39 100
    //Bottom 40 115
    if (e.keyCode === 97) {
      this.initDeg = this.initDeg - this.radian
      console.log('left', this.left, this.initDeg)
    }
    if (e.keyCode === 119) {
      // Top
      this.top += Math.sin(this.initDeg) * this.speed
      this.left += Math.cos(this.initDeg) * this.speed
      console.log('deg', this.initDeg)
    }
    if (e.keyCode === 100) {
      this.initDeg = this.initDeg + this.radian
      console.log('right', this.left, this.initDeg)
    }
    if (e.keyCode === 115) {
      // Down
      this.top -= Math.sin(this.initDeg) * this.speed
      this.left -= Math.cos(this.initDeg) * this.speed
    }
  }
}