import { Component, OnInit, Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BlogServices } from '../services/blog.service'
import { UserService } from '../services/user.service'
import * as API from '../services/config'

@Component({
  selector: 'blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  host: {
    class: 'col-md-12 col-sm-12 col-lg-12'
  }
})
@Injectable()
export class BlogDetail implements OnInit {
  paramID: string
  Blog: {}
  constructor(private activeRoute: ActivatedRoute, private blogSer: BlogServices, private _User: UserService) {

  }

  ngOnInit(): void {

    this.activeRoute.paramMap
      .subscribe(params => {
        this.paramID = params.get('id')
      })
    //this.paramID = this.activeRoute.snapshot.paramMap.get('id')
    this.blogSer.getDetailBlog(this.paramID)
      .subscribe(res => {
        let blogHanlder = res['blog']

        let image = blogHanlder.picture
        let apiScreenIMG = `${API.urlServer}/assert/images/${image}`

        blogHanlder.picture = apiScreenIMG

        this.Blog = blogHanlder
      }, err => {

      })
  }
}