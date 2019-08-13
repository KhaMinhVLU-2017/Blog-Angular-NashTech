import { Component, OnInit, Injectable } from '@angular/core'
import { BlogServices } from '../services/blog.service'
import * as API from '../services/config'

@Injectable()
@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  host: {
    class: 'col-md-12 col-sm-12 col-lg-12'
  }
})

export class BlogList implements OnInit {
  ListBlog: []
  urlServer: string

  constructor(private httpBlog: BlogServices) { }

  ngOnInit(): void {
    this.urlServer = API.urlServer
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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