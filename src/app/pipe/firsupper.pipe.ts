import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'firstUpper'})
export class FirstUpper implements PipeTransform {

  transform(value: any) {
    let arrValue = value.split(' ')
    arrValue = arrValue.map(item => this.UpperWord(item))
    return arrValue.join(' ')
  }

  UpperWord(word){
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

}