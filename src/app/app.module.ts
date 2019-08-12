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
import {HttpClientModule} from '@angular/common/http'
import {BlogServices} from './services/blog.service'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: BlogList },
  { path: 'blog/:id', component: BlogDetail}
];


@NgModule({
  declarations: [
    AppComponent,LayoutComponent,BlogCreate,
    BlogDetail,BlogEdit,BlogList,AccountLayout,AccountLogin,AccountRegister
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BlogServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
