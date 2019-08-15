import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import * as API from '../services/config'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: {}

  subEventAddUser: Subject<any> = new Subject<any>() // Add User

  subEventRejectUser: Subject<any> = new Subject<any>()// Destroy User

  constructor(private http: HttpClient, private _Router: Router) {

    this.subEventRejectUser.subscribe(value => {
      if (value) {
        localStorage.clear()
        this.currentUser = {}
        //let url = this._Router.url // url current
        // this._Router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>
        //   this._Router.navigate([url]))
        // //console.log(url)
        //this._Router.navigate(['home'])
      }
    })

    this.subEventAddUser.subscribe(value => {
      let fullname = value['fullname']
      let token = value['token']
      localStorage.setItem('_fullname', fullname)
      localStorage.setItem('_token', token)
      this.currentUser = { fullname, token }
    })

    let fullname = localStorage.getItem('_fullname')
    let token = localStorage.getItem('_token')

    this.currentUser = {
      fullname, token
    }
  }

  Login(user: FormData) {
    let urlAPI = `${API.urlAPI}/account/login`
    return this.http.post(urlAPI, user)
  }

  setUser(fullname, token) {
    this.subEventAddUser.next({ fullname, token }) // setUser
  }

  Logout() {
    this.subEventRejectUser.next(true) // Destroy User
  }

  Register(user: FormData) {
    let urlAPI = `${API.urlAPI}/account/register`
    return this.http.post(urlAPI, user)
  }

}