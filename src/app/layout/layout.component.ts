import { Component, Injectable, OnInit } from '@angular/core'
import { BlogServices } from '../services/blog.service'
import {UserService} from '../services/user.service'

@Injectable()
@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  host: {
    class: 'row'
  }
})

export class LayoutComponent implements OnInit {
  screen: boolean
  screenBlog : boolean

  constructor(private blog: BlogServices,private _User: UserService) {
    // this.blog.getList()
    // .subscribe(data => {console.log(data)})
    // Note
    this.screen = false
    this.screenBlog = false
  }

  ngOnInit() {

  }

  toggleBlog(){
    this.screenBlog = !this.screenBlog
  }
  toggle(){
    this.screen = !this.screen
  }

  logout(){
    this._User.Logout()
  }
}