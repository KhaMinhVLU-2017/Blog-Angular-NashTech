import { Component, Injectable, OnInit } from '@angular/core'
import { BlogServices } from '../services/blog.service'

@Injectable()
@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  constructor(private blog: BlogServices) {
    // this.blog.getList()
    // .subscribe(data => {console.log(data)})
    // Note
    console.log('Contructor')
  }

  ngOnInit() {
    // this.blog.getList()
    //   .subscribe(data => { console.log('NgOnInit',data) })

    // this.blog.getDetailBlog(18)
    // .subscribe(data => { console.log('DetailBlog',data) })

    // Post Done
    // let formData = new FormData()
    // formData.set('Title', 'Title')
    // formData.set('Sapo', ' nen satoi')
    // formData.set('Content', 'princisle')
    // formData.set('file','loida')

    // this.blog.postCreateBlog(formData)
    //   .subscribe(data => { console.log('create',data) })

    // let formData = new FormData()
    // formData.set('id', '100')
    // this.blog.postDeleteBlog(formData)
    //    .subscribe(data => { console.log('create',data) })

    //  let formData = new FormData()
    // formData.set('Title', 'Title')
    // formData.set('Sapo', ' nen satoi')
    // formData.set('Content', 'princisle')
    // formData.set('file','loida')
    // formData.set('Picture','KeepNew')
    // this.blog.postEditBlog(formData)
    //     .subscribe(data => { console.log('create',data) })
  }

}