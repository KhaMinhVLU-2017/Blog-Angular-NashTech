import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import * as API from '../services/config'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: {}

  constructor(private http: HttpClient){
    let fullname = localStorage.getItem('_fullname')
    let token = localStorage.getItem('_token')
    this.currentUser = {
      fullname,token
    }
  }

  Login(user: FormData){
    let urlAPI = `${API.urlAPI}/account/login`
    return this.http.post(urlAPI,user)
  }

  setUser(fullname,token){
    localStorage.setItem('_fullname',fullname)
    localStorage.setItem('_token',token)
    this.currentUser={
      fullname,token
    }
  }

  Logout(){
    localStorage.clear()
    this.currentUser={}
  }

  Register(){

  }

}