import {Component} from '@angular/core'
import { parse } from 'marked';

@Component({
  selector: 'blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
  host: {
    class:'col-md-12 col-sm-12 col-lg-12'
  }
})

export class BlogCreate{
  images : string

  handChangeIMG(e){
    let file = e.target.files[0]
    let reader  = new FileReader()
    reader.onload = () => {
      let dataURL = reader.result
      this.images = dataURL.toString()
    }
    reader.readAsDataURL(file)
  }
}