import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core'
import { BlogServices } from '../services/blog.service'
import { UserService } from '../services/user.service'
import * as API from '../services/config'

@Injectable()
@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  host: {
    class: 'row'
  }
})

export class BlogList implements OnInit, AfterViewInit {

  ListBlog: []
  urlServer: string
  linkServerIMG: string
  errorMess: boolean = false

  constructor(private httpBlog: BlogServices, private _User: UserService) { }

  ngOnInit(): void {
    this.linkServerIMG = `${API.urlServer}/assert/images`
  }

  ngAfterViewInit(): void {
    this.urlServer = API.urlServer
    this.httpBlog.getList()
      .subscribe(res => {
        let blogHanlder = res['listBlog']
        blogHanlder.map(item => {
          let namePicture = item.picture
          if (namePicture !== null) {
            item.picture = `${this.urlServer}/assert/images/${namePicture}`
            return item
          }
          return item
        })
        blogHanlder.map(item => {
          let count = item.sapo.length
          let splitCount = 50
          if (count > splitCount) {
            item.sapo = item.sapo.slice(0, splitCount) + '...'
            return item
          }
          item.sapo = item.sapo
          return item
        })

        //this.ListBlog = blogHanlder.slice(0,6)
        this.ListBlog = blogHanlder
      },
        err => {
          console.log(err)
        })
  }

  submitSearch() {
    let formData = new FormData()
    formData.set('key', this.httpBlog['keysearch'])
    this.httpBlog.postSearchBlog(formData)
      .subscribe(res => {
        let status = res['status']
        if (status === 200) {
          let listBlog = res['listBlog']
          if (listBlog.length < 0) {
            this.errorMess = true
          } else {
            listBlog.map(item => {
              item.picture = `${this.linkServerIMG}/${item.picture}`
              let count = item.sapo.length
              let splitCount = 50
              if (count > splitCount) {
                item.sapo = item.sapo.slice(0, splitCount) + '...'
                return item
              }
              item.sapo = item.sapo
              return item
            })     
            this.httpBlog.listSearch = [...listBlog]
          }
        } else if (status === 403) {
          this._User.subEventRejectUser.next(true)
        } else {
          this._User.subEventRejectUser.next(true)
        }
      }, err => {
        console.log(err)
      })
  }

  changeSearch(e, event) {
    let { value, name } = e
    this.httpBlog[name] = value
    // if (event.keyCode === 13) {
    //   this.submitSearch()
    // }
    if(event.keyCode === 46) {
      this.submitSearch()
    }
    if(value.length < 1) {
      this.httpBlog.listSearch = []
    }
    this.submitSearch()
  }
}