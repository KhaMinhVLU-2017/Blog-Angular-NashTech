import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core'
import { CommentService } from '../../services/comment.service'
import { UserService } from '../../services/user.service'
import { ConditionalResponse } from '../../Utility/function'
import { milisecondStandard } from '../../services/config'
import { SignalRService } from '../../services/SignalRService.service'

@Injectable()
@Component({
  selector: 'comment-list-admin',
  styleUrls: ['./comment-listAdmin.component.css'],
  templateUrl: './comment-listAdmin.component.html'
})

export class CommentListAdmin implements OnInit, AfterViewInit {
  isSelectItem: any = null
  ListComment: Array<object>
  isAniSaving: boolean = false

  constructor(private _commentService: CommentService, private _userService: UserService, private _signalR: SignalRService) { }
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
        } else {
          ConditionalResponse(status, this._userService)
        }
      },
      error => { console.log(error) })
  }
  handlerEditComment(item) {
    this.isSelectItem = item
  }
  saveChangeComment(): void {
    let startTime: any = new Date()
    this.isAniSaving = true
    let formData = new FormData()
    formData.set('CommentID', this.isSelectItem.commentID)
    formData.set('Content', this.isSelectItem.content)
    formData.set('crDate', this.isSelectItem.crDate)
    formData.set('UserID', this.isSelectItem.userID)
    let token = this._userService.currentUser['token']
    this._commentService.adminUpdateComment(formData, token).subscribe(
      response => {
        let status = response['status']
        let endTime: any = new Date()
        if (status === 200) {
          let milisecond: any = endTime - startTime
          if (milisecond < milisecondStandard) {
            setTimeout(() => {
              this.isAniSaving = false
              this._signalR.sendEditComment(this.isSelectItem) //send realtime
            }, milisecondStandard)
          }else{
            this.isAniSaving = false
            this._signalR.sendEditComment(this.isSelectItem) //send realtime
          }
        } else if (status === 500) {
          this.isAniSaving = false
          this.ngAfterViewInit()
        } else {
          ConditionalResponse(status, this._userService)
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  keyEventTXA(e){
    if(e.keyCode ===13){
      this.saveChangeComment()
      let btn_CloseModal = document.getElementById('btn_CloseModal')
      btn_CloseModal.click()
    }
  }

  DeleteComment(commentID){
    let startTime: any = new Date()
    this.isAniSaving = true
    let data = new FormData()
    data.set('Id',commentID)
    let token = this._userService.currentUser['token']
    this._commentService.adminDeleteComment(data,token).subscribe(
      response => {
        let status = response['status']
        let endTime: any = new Date()
        if (status === 200) {
          let milisecond: any = endTime - startTime
          if (milisecond < milisecondStandard) {
            setTimeout(() => {
              let listComment = this.ListComment
              listComment = listComment.filter( s=>s['commentID'] !== commentID)
              this.ListComment = listComment
              this.isAniSaving = false
              this._signalR.sendDeleteComment(commentID)
            }, milisecondStandard)
          }else{
            let listComment = this.ListComment
            listComment = listComment.filter( s=>s['commentID'] !== commentID)
            this.ListComment = listComment
            this.isAniSaving = false
            this._signalR.sendDeleteComment(commentID)
          }
        } else if (status === 500) {
          this.isAniSaving = false
          this.ngAfterViewInit()
        } else {
          ConditionalResponse(status, this._userService)
        }
      },
      error => {
        console.log(error)
      }
    )
  }
}