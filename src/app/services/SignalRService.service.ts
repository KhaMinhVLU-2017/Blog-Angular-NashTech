import { Injectable } from '@angular/core'
import * as signalR from '@aspnet/signalr'
import * as API from './config'
import {Subject} from 'rxjs'

@Injectable({
  providedIn:'root'
})

export class SignalRService {

  addCommentObser: Subject<any> = new Subject()
  addCommentEditObser: Subject<any> = new Subject()
  addCommentDeleteObser: Subject<any> = new Subject()

  private hubConnection: signalR.HubConnection


  public startConnection (){
    this.hubConnection = new signalR.HubConnectionBuilder()
                                .withUrl(API.urlRealtime)
                                .build()
    this.hubConnection
    .start()
    .then(()=> console.log('Connection Start'))
    .catch(err => console.log('Error while starting connection: ' + err))
  }

  public commentListener (){
    this.hubConnection.on('ReceiveComment', (comment) => {
      this.addCommentObser.next(JSON.parse(comment))
    });
    this.hubConnection.on('ReceiveEdit', comment =>{
      this.addCommentEditObser.next(JSON.parse(comment))
    })
    this.hubConnection.on('ReceiveDelete', commentID => {
      this.addCommentDeleteObser.next(commentID)
    })
  }

  public sendComment(comment) {
    this.hubConnection.invoke("SendComment",comment)
  }

  public sendEditComment(comment) {
    this.hubConnection.invoke("EditComment",comment)
  }

  public sendDeleteComment(commentID) {
    this.hubConnection.invoke("DeleteComment",commentID)
  }
}