import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import {UserService} from './user.service'

@Injectable({
  providedIn:'root'
})

export class AuthGuardService implements CanActivate {


  constructor(private _router: Router, private _User: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let UserFullName = this._User.currentUser['fullname']
    console.log('CheckRoute DIrect',UserFullName)
    //check some condition
    if (UserFullName) {
    
      return true;

    } 
    this._router.navigate(["/account/login"],{ queryParams: { retUrl:state.url} })
    return false;
  }
}