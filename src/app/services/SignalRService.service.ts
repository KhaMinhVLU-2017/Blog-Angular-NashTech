import { Injectable } from '@angular/core'
import * as signalR from '@aspnet/signalr'
import * as API from './config'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  listUserOnline: Array<any> = []

  addCommentObser: Subject<any> = new Subject()
  addCommentEditObser: Subject<any> = new Subject()
  addCommentDeleteObser: Subject<any> = new Subject()
  addOnlineUser: Subject<any> = new Subject()
  addRejectOfflineUser: Subject<any> = new Subject()

  private hubConnection: signalR.HubConnection

  constructor() {
    // Save User Online screen
    this.addOnlineUser.subscribe(listUser => {
      console.log('LisUser',listUser)
      this.listUserOnline = [...listUser]
    })

    this.addRejectOfflineUser.subscribe(listUser => {
      this.listUserOnline = [...listUser]
    })
  }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(API.urlRealtime,
        {
          skipNegotiation: true, // Notice
          transport: signalR.HttpTransportType.WebSockets
        })
      .build()
    this.hubConnection
      .start()
      .then(() => console.log('Connection Start'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public commentListener() {
    this.hubConnection.on('ReceiveComment', (comment) => {
      this.addCommentObser.next(JSON.parse(comment))
    });
    this.hubConnection.on('ReceiveEdit', comment => {
      this.addCommentEditObser.next(JSON.parse(comment))
    })
    this.hubConnection.on('ReceiveDelete', commentID => {
      this.addCommentDeleteObser.next(commentID)
    })

  }

  public onlineGameListener() {
    this.hubConnection.on('OnlineUser', fullname => {
      this.addOnlineUser.next(fullname)
    })

    this.hubConnection.on('OfflineUser', listUser => {
      this.addRejectOfflineUser.next(listUser)
    })
  }

  public sendComment(comment) {
    this.hubConnection.invoke("SendComment", comment)
  }

  public sendEditComment(comment) {
    this.hubConnection.invoke("EditComment", comment)
  }

  public sendDeleteComment(commentID) {
    this.hubConnection.invoke("DeleteComment", commentID)
  }

  public sendRegisterGame(car) {
    this.hubConnection.invoke("RegisterGame", car)
  }

  public sendRejectUserGame(fullname) {
    let car =this.listUserOnline.filter(item =>item.fullname == fullname)
    this.hubConnection.invoke("RejectUserGame", car)
  }

}