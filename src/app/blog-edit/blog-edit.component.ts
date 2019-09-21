import { Component, Injectable, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BlogServices } from '../services/blog.service'
import { UserService } from '../services/user.service'
import { Location } from '@angular/common'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import * as API from '../services/config'

@Injectable()
@Component({
  selector: 'blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
  host: {
    class: 'col-md-12 col-sm-12 col-lg-12'
  }
})

export class BlogEdit implements OnInit {
  paramID: string
  images: any // Base 64 screen IMG
  picture: any = 'KeepOld' // Title Images from server
  htmlContent: string
  title: string
  sapo: string
  file: File
  errorMessage: string
  blogID: string

  constructor(private _router: Router,private _activeRoute: ActivatedRoute, private _Blog: BlogServices, private _Location: Location, private _User: UserService) { }

  ngOnInit(): void {

    this._activeRoute.paramMap
      .subscribe(params => {
        this.paramID = params.get('id')
      })
    let token = this._User.currentUser['token']
  
    this._Blog.getDetailBlogForAuthor(this.paramID,token)
      .subscribe(res => {
        let status = res['status']
        if (status === 200) {
          let title = res['blog']['title']
          let sapo = res['blog']['sapo']
          let picture = res['blog']['picture']
          let content = res['blog']['content']
          let blogID = res['blog']['blogID']

          this.htmlContent = content
          this.sapo = sapo
          this.title = title
          this.images = `${API.urlServer}/assert/images/${picture}`
          this.blogID = blogID
        } else if (status === 403) {
          this._User.changeMessageError('Bạn chưa có tuổi để sửa được bài viết này : ))')
        } else if(status === 404) {
          this._User.changeMessageError('Not Found 404')
        }else {
          this._User.subEventRejectUser.next(true)
        }
      }, err => {
        console.log(err)
      })
  }

  handChangeIMG(e) {
    let file = e.target.files[0]
    this.file = file
    if (file !== undefined) {
      this.picture = 'KeepNew'
      let reader = new FileReader()
      reader.onload = () => {
        let dataURL = reader.result
        this.images = dataURL.toString()
      }
      reader.readAsDataURL(file)
    }
  }
  submitServer() {
    let blog = new FormData()
    blog.set('BlogID',this.blogID)
    blog.set('Title', this.title)
    blog.set('Sapo',this.sapo)
    blog.set('Content', this.htmlContent)
    blog.set('Picture',this.picture)
    blog.set('file', this.file)

    let token = this._User.currentUser['token']
    this._Blog.postEditBlog(blog,token)
    .subscribe(res=> {
      let status = res['status']
      if(status===200) {
        this._router.navigate(['home','blog',this.paramID])
      }else if(status ===403) {
        this._User.subEventRejectUser.next(true)
      }else {
        this._User.subEventRejectUser.next(true)
      }
    },err => {
      console.log(err)
    })
  }

  handlDelete(){
    let data = new FormData()
    data.set('id', this.blogID)
    let token = this._User.currentUser['token']
    this._Blog.postDeleteBlog(data,token)
    .subscribe(res => {
      let status = res['status']
      if(status === 200) {
        this._router.navigate(['home'])
      }else if(status === 403) {
        this._User.subEventRejectUser.next(true)
      }else {
        this._User.subEventRejectUser.next(true)
      }
    },err=> {
      console.log(err)
    })
  }

  goBack() {
    this._Location.back()
  }

  handlChange(e) {
    let { value, name } = e
    this[name] = value
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '500px',
    placeholder: 'Enter text here...',
    enableToolbar: true,
    showToolbar: true,
    translate: 'no',
    defaultFontName: 'Times New Roman',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadUrl: `${API.urlAPI}/blog/SaveIMG`, // Todo Add Link Server
    sanitize: true,
    toolbarPosition: 'top'
  }
}