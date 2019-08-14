import {Injectable} from '@angular/core'
import {HttpClient,HttpParams} from '@angular/common/http'
import * as API from './config'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BlogServices{
  
  constructor(private http: HttpClient) {
  }

  getList(){
    let apiGet = `${API.urlAPI}/blog/List`
    return this.http.get(apiGet)
  }

  getDetailBlog(id){
    let apiGet = `${API.urlAPI}/blog/get`
    let params = {id}
    return this.http.get(apiGet,{params})
  }
  // FormData for Params
  postCreateBlog(data: FormData, token: string){
    let apiGet = `${API.urlAPI}/blog/Create`
    return this.http.post(apiGet,data,{headers:{'Authorization':token}})
  }
  //FormData
  postDeleteBlog(data: FormData, token: string){ 
    let apiGet = `${API.urlAPI}/blog/Remove`
    return this.http.post(apiGet,data)
  }

  postEditBlog(data: FormData) {
    let apiGet = `${API.urlAPI}/blog/Edit`
    return this.http.post(apiGet,data)
  }

}