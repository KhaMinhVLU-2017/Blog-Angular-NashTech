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
  isSelectItem: any = null
  ListComment: []
  isAniSaving: boolean= false

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
  }
  saveChangeComment(): void{
    this.isAniSaving = true
    let formData = new FormData()
    formData.set('CommentID',this.isSelectItem.commentID)
    formData.set('Content',this.isSelectItem.content)
    formData.set('crDate',this.isSelectItem.crDate)
    formData.set('UserID',this.isSelectItem.userID)
    let token = this._userService.currentUser['token']
    this._commentService.adminUpdateComment(formData,token).subscribe(
      response => {
        let status= response['status']
        if(status===200) {
          setTimeout(()=>{
            this.isAniSaving = false
          },1000)
        }else if(status === 500){
          this.isAniSaving = false
          this.ngAfterViewInit()
        } else {
          ConditionalResponse(status,this._userService)
        }
      },
      error => {
        console.log(error)
      }
    )
  }
}