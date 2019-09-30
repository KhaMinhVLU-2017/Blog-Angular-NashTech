import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core'
import { CommentService } from '../../services/comment.service'
import { UserService } from '../../services/user.service'
import {ConditionalResponse} from '../../Utility/function'

@Injectable()
@Component({
  selector: 'comment-list-admin',
  styleUrls: ['./comment-listAdmin.component.css'],
  templateUrl: './comment-listAdmin.component.html'
})

export class CommentListAdmin implements OnInit, AfterViewInit {
  isSelectItem: any
  ListComment: []

  constructor(private _commentService: CommentService, private _userService: UserService) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    let token = this._userService.currentUser['token']
    this._commentService.getListComment(token).subscribe(
      response => {
        let status = response['status']
        if (status === 200) {
          let listComment = response['listComment']
          this.ListComment = listComment
        } else{
          ConditionalResponse(status,this._userService)
        }
      },
      error => { console.log(error) })
  }
  handlerEditComment(item) {
    this.isSelectItem = item
    console.log(item)
  }

}