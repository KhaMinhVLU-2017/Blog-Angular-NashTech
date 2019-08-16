import { Component, OnInit, Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BlogServices } from '../services/blog.service'
import { UserService } from '../services/user.service'
import { CommentService } from '../services/comment.service'
import * as API from '../services/config'
import { SignalRService } from '../services/SignalRService.service'

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
  isChoose: boolean = false
  paramID: string
  Blog: {
    listComment: Array<object>
  }
  comment: string = null
  isSelectComment: object = {
    commentID: '',
    content: '',
    crDate: '',
    userID: '',
    authorComment: ''
  }

  constructor(private _Router: Router, private activeRoute: ActivatedRoute, private blogSer: BlogServices, private _User: UserService,
    private _Comment: CommentService, private _signalR: SignalRService) { }

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
          this._Router.navigate(['home'])
        }
      }, err => {
        console.log(err)
      })
    this._signalR.commentListener()// Listener realtime

    // Get Comment realtime
    this._signalR.addCommentObser
      .subscribe(comment => {
        if (!this.isChoose) {
          let listComment = this.Blog.listComment
          listComment.unshift(comment)
          this.Blog.listComment = listComment
        }
        this.isChoose = false
      })
    // Edit Comment realtime
    this._signalR.addCommentEditObser
      .subscribe(commentEdit => {
        if (!this.isChoose) {
          let commentID = commentEdit['commentID']
          let listComment = this.Blog.listComment
          listComment.map(item => {
            if (item['commentID'] == commentID) {
              item['content'] = commentEdit['content']
              return item
            }
            return item
          })
          this.Blog.listComment = listComment
        }
        this.isChoose = false
      })

    //Delete comment realtime
    this._signalR.addCommentDeleteObser
      .subscribe(commentID => {
        if (!this.isChoose) {
          let listComment = this.Blog.listComment
          listComment = listComment.filter(item => item['commentID'] != commentID)
          this.Blog.listComment = listComment
        }
        this.isChoose = false
      })
  }

  handlChangeKey(e, event) {
    let { value, name } = e
    this[name] = value
    if (event.keyCode === 13) {
      this.submitComment()
    }
  }

  submitComment() {
    let token = this._User.currentUser['token']
    let data = new FormData()
    data.set('Content', this.comment)
    data.set('BlogID', this.paramID)

    this._Comment.postCreateMomment(data, token)
      .subscribe(res => {
        let status = res['status']
        if (status === 200) {
          this.isChoose = true
          let comment = res['comment']
          this.Blog.listComment.unshift(comment)
          this._signalR.sendComment(comment)
          this.comment = null
          // Todo Logic
        } else if (status === 403) {
          this._User.subEventRejectUser.next(true)
        } else {
          this._User.subEventRejectUser.next(true)
        }
      }, error => {
        console.log(error)
      })
  }

  handCommentEdit(comment) {
    this.isSelectComment = comment
  }

  //Edit comment
  handComSave() {
    let comment = new FormData()
    comment.set('Content', this.isSelectComment['content'])
    comment.set('CommentID', this.isSelectComment['commentID'])
    let token = this._User.currentUser['token']
    this._Comment.postEditComment(comment, token)
      .subscribe(res => {
        let status = res['status']
        if (status === 200) {
          this.isChoose = true
          let listCommentNew = this.Blog.listComment
          listCommentNew.map(item => {
            if (item['commentID'] === this.isSelectComment['commentID']) {
              item['content'] = this.isSelectComment['content']
              return item
            }
            return item
          })
          this._signalR.sendEditComment(this.isSelectComment) //send realtime
          this.Blog.listComment = listCommentNew
        } else if (status === 403) {
          this._User.changeMessageError('Forbidden')
        } else {
          this._User.subEventRejectUser.next(true)
        }
      }, err => {

      })
  }

  deleteComment() {
    let data = new FormData()
    data.set('commentID', this.isSelectComment['commentID'])
    let token = this._User.currentUser['token']
    this._Comment.postDeleteComment(data, token)
      .subscribe(res => {
        let status = res['status']
        if (status === 200) {
          this.isChoose = true
          let newListComment = this.Blog.listComment
          let commentID = this.isSelectComment['commentID']
          newListComment = newListComment.filter(item => item['commentID'] !== commentID)
          this.Blog.listComment = newListComment
          this._signalR.sendDeleteComment(commentID)
        } else if (status === 403) {
          this._User.subEventRejectUser.next(true)
        } else {
          this._User.subEventRejectUser.next(true)
        }
      }, err => {
        console.log(err)
      })
  }

  keyUpComment(e, event) {
    let { value } = e
    this.isSelectComment['content'] = value
    if (event.keyCode === 13) {
      this.handComSave()
      let btn_closeModal = document.getElementById('btn_closeModal')
      btn_closeModal.click()
    }

  }
}