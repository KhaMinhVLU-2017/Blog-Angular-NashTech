import { Component, AfterViewInit, OnInit, Injectable } from '@angular/core'
import { BlogServices } from '../../services/blog.service'
import { UserService } from '../../services/user.service'
import * as API from '../../services/config'

@Injectable()
@Component({
    selector: 'blog-list-admin',
    styleUrls: ['./blog-listAdmin.component.css'],
    templateUrl: './blog-listAdmin.component.html'
})

export class BlogListAdmin implements OnInit, AfterViewInit {
    ListBlog: []
    linkServerIMG: String

    constructor(private _blogService: BlogServices,private _userService : UserService) { }

    ngOnInit(): void {
        this.linkServerIMG = `${API.urlServer}/assert/images`
    }
    ngAfterViewInit(): void {
        this._blogService.getList().subscribe(
            response => {
                let status = response['status']
                let listBlog = response['listBlog']
                if (listBlog.length > 0 && status === 200) {
                    listBlog.map(item => {
                        if (item.picture !== null) {
                            item.picture = `${this.linkServerIMG}/${item.picture}`
                            return item
                        }
                        return item
                    })
                    this.ListBlog = listBlog
                }else
                if (status === 403) {
                    this._userService.Logout()
                } else {
                    this._userService.Logout()
                }
            },
            error => { console.log(error) }
        )
    }
}