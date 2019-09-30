import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import * as API from './config'

@Injectable({
  providedIn: 'root'
})

export class CommentService{

  constructor(private _http: HttpClient) {}

  postCreateMomment(data: FormData, token: string){
    let url= `${API.urlAPI}/comment/Create`
    return this._http.post(url,data,{headers: {'Authorization': token }})
  }

  postDeleteComment(data: FormData, token: string){
    let url= `${API.urlAPI}/comment/Remove`
    return this._http.post(url,data,{headers: {'Authorization': token }})
  }

  postEditComment(data: FormData, token: string) {
    let url= `${API.urlAPI}/comment/Edit`
    return this._http.post(url,data,{headers: {'Authorization': token }})
  }

  getListComment(token: string){
    let url= `${API.urlAPI}/admin/comments`
    return this._http.get(url, { headers: { 'Authorization': token } })
  }

  adminUpdateComment(data: FormData, token: string){
    let url= `${API.urlAPI}/admin/UpdateComment`
    return this._http.post(url,data,{headers: {'Authorization': token }})
  }
}