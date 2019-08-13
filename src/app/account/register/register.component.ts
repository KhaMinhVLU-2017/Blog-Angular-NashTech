import {Component,Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {UserService} from '../../services/user.service'

@Injectable()
@Component({
  selector: 'account-register',
  templateUrl :'./register.component.html',
  styleUrls: ['./register.component.css'],
  host: {
    class: 'col-md-6 col-sm-6 col-lg-6 account'
  }
})

export class AccountRegister {
  fullname:string =null
  username:string =null
  password:string =null
  errMessage : string = null

  constructor(private _User: UserService, private _ruoter: Router){

  }
  
  SubmitRegister(){
    let data = new FormData()
    data.set('username',this.username)
    data.set('fullname',this.fullname)
    data.set('password',this.password)
    this._User.Register(data)
    .subscribe(res=> {
      let status =res['status']
      let message=res['message']
      let fullname= res['fullname']
      let token = res['token']
      if(status === 200) {
        this._User.setUser(fullname,token)
        this._ruoter.navigate(['/home'])
      }else if(status === 403) {
        this.errMessage = message
      }else {
        this.errMessage = message
      }
    },
    err=> {
      console.log(err)
    })
  }

  handlChange(e,event){
    let {name,value} = e
    this[name] = value
    if(name==='password' && event.keyCode===13) {
      this.SubmitRegister()
    }

  }

}