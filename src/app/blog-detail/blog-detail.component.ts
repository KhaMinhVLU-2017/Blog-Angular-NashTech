import { Component, OnInit, Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
  constructor(private _Router: Router,private activeRoute: ActivatedRoute, private blogSer: BlogServices, private _User: UserService) {

  }

  ngOnInit(): void {

    this.activeRoute.paramMap
      .subscribe(params => {
        this.paramID = params.get('id')
      })
    //this.paramID = this.activeRoute.snapshot.paramMap.get('id')
    let token = this._User.currentUser['token']
    this.blogSer.getDetailBlog(this.paramID, token)
      .subscribe(res => {
        let status = res['status']
        if (status === 200) {
          let blogHanlder = res['blog']

          let image = blogHanlder.picture
          let apiScreenIMG = `${API.urlServer}/assert/images/${image}`

          blogHanlder.picture = apiScreenIMG

          this.Blog = blogHanlder
        } else if (status === 404) {
          this._Router.navigate(['error'])
        } else {
          this._User.subEventRejectUser.next(true)
        }
      }, err => {
          console.log(err)
        })
  }
}