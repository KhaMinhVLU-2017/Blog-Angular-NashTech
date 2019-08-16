import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core'
import { BlogServices } from '../services/blog.service'
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

export class BlogList implements OnInit,AfterViewInit {

  ListBlog: []
  urlServer: string

  constructor(private httpBlog: BlogServices) { }

  ngOnInit(): void {

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
          if(count > splitCount) {
            item.sapo = item.sapo.slice(0,splitCount) + '...'
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
}