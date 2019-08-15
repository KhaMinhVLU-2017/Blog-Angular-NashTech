import {Component, Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {UserService} from '../services/user.service'

@Injectable()
@Component({
  selector: 'error-view',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  host: {
    class: 'row divBound'
  }
})

export class ErrorComponent {
 
  second: number = 3
  constructor(private _Router: Router, private _User: UserService){
    this.ReloadDirect()
  }


  ReloadDirect(){
    let t = setInterval(()=>{
      if(this.second === 0) {
        clearInterval(t)
        this._Router.navigate(['home'])
      }
      this.second--
    },1000)
  }
}