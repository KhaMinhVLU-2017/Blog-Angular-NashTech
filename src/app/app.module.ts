import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LayoutComponent} from './layout/layout.component'
import {BlogList} from './blog-list/blog-list.component'
import {BlogEdit} from './blog-edit/blog-edit.component'
import {BlogDetail} from './blog-detail/blog-detail.component'
import {BlogCreate} from './blog-create/blog-create.component'
import {AccountLayout} from './account/account-layout.component'
import {AccountLogin} from './account/login/login.component'
import {AccountRegister} from './account/register/register.component'
import {HttpClientModule,HttpClient} from '@angular/common/http'
import {BlogServices} from './services/blog.service'
import { RouterModule, Routes } from '@angular/router'
import {MarkdownModule,MarkedOptions} from 'ngx-markdown'
import {UserService} from './services/user.service'
import {FirstUpper} from './pipe/firsupper.pipe'
import { AngularEditorModule } from '@kolkov/angular-editor'
import { FormsModule } from '@angular/forms'
import {SplitTitle} from './pipe/splitTitle.pipe'
import {AuthGuardService} from './services/AuthGuardService.service'
import {AuthDirectService} from './services/AuthDirect.service'
import {ErrorComponent} from './error/error.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', component: LayoutComponent ,
    children:[
      { path: '', component: BlogList},
      { path: 'blog/:id', component: BlogDetail},
      { path: 'create', component: BlogCreate, canActivate: [AuthGuardService,AuthDirectService]},
      { path: 'edit/:id',component: BlogEdit, canActivate: [AuthGuardService,AuthDirectService]}
    ]
  },
  { path: 'account', redirectTo: '/account/login', pathMatch: 'full' },
  {
    path: 'account', component: AccountLayout,
    children:[
      {path: 'login', component:AccountLogin},
      {path: 'register', component: AccountRegister}
    ]
  },
  {path: '**',component: ErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,LayoutComponent,BlogCreate,
    BlogDetail,BlogEdit,BlogList,AccountLayout,AccountLogin,AccountRegister,
    FirstUpper,
    SplitTitle,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    FormsModule,
    AngularEditorModule
  ],
  providers: [BlogServices,UserService,AuthGuardService,AuthDirectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
