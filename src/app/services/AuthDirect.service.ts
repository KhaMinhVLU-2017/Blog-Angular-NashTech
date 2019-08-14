import { Router, CanActivate } from '@angular/router'
import { Injectable } from '@angular/core'
import {UserService} from './user.service'

@Injectable({
  providedIn:'root'
})

export class AuthDirectService implements CanActivate {


  constructor(private _router: Router, private _User: UserService) {
    this._User.subEventRejectUser.subscribe(value => {
        console.log('Start Event Direct')
    })
  }

  canActivate() {
    return true
  }

}