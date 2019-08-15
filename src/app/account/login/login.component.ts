import { Component, Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/user.service'

@Injectable()
@Component({
  selector: 'account-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    class: 'col-md-6 col-sm-6 col-lg-6 account'
  }
})

export class AccountLogin {
  username: string
  password: string
  errorMess: string
  retUrl: string = null

  constructor(private _user: UserService, private router: Router, private activeRoute: ActivatedRoute) {
    this.retUrl = activeRoute.snapshot.queryParams['retUrl']===undefined ? null : activeRoute.snapshot.queryParams['retUrl']
  }

  handlChange(e, event) {
    let { name, value } = e
    this[name] = value
    if (name === 'password' && event.keyCode === 13) {
      this.SubmitLogin()
    }
  }

  SubmitLogin() {
    let form = new FormData()
    form.set('username', this.username)
    form.set('password', this.password)
    this._user.Login(form).subscribe(
      res => {
        let status = res['status']
        let message = res['message']
        let fullname = res['fullname']
        let token = res['token']
        if (status === 200) {
          this._user.setUser(fullname, token)
          if (this.retUrl !== null) {
            this.router.navigate([this.retUrl])
          } else {
            this.router.navigate(['/home'])
          }
        } else
          if (status === 403) {
            this.errorMess = message
          } else {
            this.errorMess = message
          }
      },
      err => {
        console.log(err)
      }
    )
  }
}