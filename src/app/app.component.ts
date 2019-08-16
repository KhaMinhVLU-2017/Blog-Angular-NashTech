import { Component, OnInit, Injectable } from '@angular/core';
import {SignalRService} from './services/SignalRService.service'
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private _signalR: SignalRService) {}
  ngOnInit(): void {
    this._signalR.startConnection()
  }
  title = 'Social-Blog-Angular';
}
