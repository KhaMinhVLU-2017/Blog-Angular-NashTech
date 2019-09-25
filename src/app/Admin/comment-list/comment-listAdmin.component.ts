import { Component, Injectable, OnInit } from '@angular/core'
import {CommentService} from '../../services/comment.service'
import {UserService} from '../../services/user.service'

@Injectable()
@Component({
    selector: 'comment-list-admin',
    styleUrls: ['./comment-listAdmin.component.css'],
    templateUrl: './comment-listAdmin.component.html'
})

export class CommentListAdmin implements OnInit{
    ListComment : []
    
    constructor(private _commentService : CommentService, private _userService: UserService){}
    ngOnInit(): void {
        let token = this._userService.currentUser['token']
        this._commentService.getListComment(token).subscribe(
            response => {
                let status = response['status']
                if(status===200) {
                    let listComment=  response['listComment']
                    this.ListComment = listComment                   
                }       
            },
            error => {console.log(error)})
    }

}