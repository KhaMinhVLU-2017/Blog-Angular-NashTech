import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'splitTitle' })

export class SplitTitle implements PipeTransform {

  transform(value: any, length: any) {
    let size = value.length
    if (size > length) {
      return value.slice(0, length) + '...'
    }
    return value
  }

}