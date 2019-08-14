import { Component, Injectable } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import * as API from '../services/config'
import { BlogServices } from '../services/blog.service'
import { UserService } from '../services/user.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Injectable()
@Component({
  selector: 'blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
  host: {
    class: 'col-md-12 col-sm-12 col-lg-12'
  }
})

export class BlogCreate {
  images: any
  htmlContent: string
  title: string
  sapo: string
  file: File
  errorMessage: string
  constructor(private _Blog: BlogServices, private _User: UserService, private _Router: Router, private _Location: Location) {
  
  }
  goBack() {
    this._Location.back()
  }

  handlChange(e) {
    let { value, name } = e
    this[name] = value
  }

  handChangeIMG(e) {
    let file = e.target.files[0]
    this.file = file
    let reader = new FileReader()
    reader.onload = () => {
      let dataURL = reader.result
      this.images = dataURL.toString()
    }
    reader.readAsDataURL(file)
  }

  submitServer() {
    let formData = new FormData()
    formData.set('Title', this.title)
    formData.set('Content', this.htmlContent)
    formData.set('Sapo', this.sapo)
    formData.set('file', this.file) // file img
    let token = this._User.currentUser['token']
    this._Blog.postCreateBlog(formData, token)
      .subscribe(res => {
        let status = res['status']
        let message = res['message']
        if (status === 200) {
          this._Router.navigate(['/home'])
        } else if (status === 403) {
          this.errorMessage = message
        } else {

        }
      }, err => {
        console.log(err)
      })
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    placeholder: 'Enter text here...',
    enableToolbar: true,
    showToolbar: true,
    translate: 'no',
    toolbarPosition: 'top',
    defaultFontName: 'Times New Roman',
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
  }


}