import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import * as API from './config'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BlogServices {

  listSearch: Array<any> = []
  keysearch: string = ''

  constructor(private http: HttpClient) {

  }

  getList() {
    let apiGet = `${API.urlAPI}/blog/List`
    return this.http.get(apiGet)
  }
  getListBlogAdmin(token: string){
    let apiGet = `${API.urlAPI}/admin/ListPost`
    return this.http.get(apiGet, { headers: { 'Authorization': token } })
  }

  getDetailBlog(id, token: string) {
    let apiGet = `${API.urlAPI}/blog/get`
    let params = { id }
    if (token) {
      return this.http.get(apiGet, { headers: { 'Authorization': token }, params })
    }
    return this.http.get(apiGet,{params})
  }

  getDetailBlogForAuthor(id, token: string) {
    let apiGet = `${API.urlAPI}/blog/GetForEdit`
    let params = { id }
    if (token) {
      return this.http.get(apiGet, { headers: { 'Authorization': token }, params })
    }
    return this.http.get(apiGet,{params})
  }
  // FormData for Params
  postCreateBlog(data: FormData, token: string) {
    let apiGet = `${API.urlAPI}/blog/Create`
    return this.http.post(apiGet, data, { headers: { 'Authorization': token } })
  }
  //FormData
  postDeleteBlog(data: FormData, token: string) {
    let apiGet = `${API.urlAPI}/blog/Remove`
    return this.http.post(apiGet, data)
  }

  //data Blog
  postEditBlog(data: FormData, token: string) {
    let apiGet = `${API.urlAPI}/blog/Edit`
    return this.http.post(apiGet, data, { headers: { 'Authorization': token } })
  }

  //Search
  postSearchBlog(data: FormData) {
    let apiGet = `${API.urlAPI}/blog/Search`
    return this.http.post(apiGet, data)
  }

}