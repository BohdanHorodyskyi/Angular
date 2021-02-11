import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { loaderConfig } from './preloader-config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { HelpingComponent } from './pages/helping/helping.component';
import { AdminComponent } from './admin/admin.component';
import { AdminStoryComponent } from './admin/admin-story/admin-story.component';
import { AdminNewChildComponent } from './admin/admin-new-child/admin-new-child.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ChildComponent } from './pages/child/child.component';
import { DonateComponent } from './admin/donate/donate.component';
import { LoginComponent } from './login/login.component';
import { StoryComponent } from './pages/story/story.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventComponent } from './pages/event/event.component';
import { AdminEventComponent } from './admin/admin-event/admin-event.component';
import { HelpComponent } from './admin/help/help.component';
import {QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StoriesComponent,
    HelpingComponent,
    AdminComponent,
    AdminStoryComponent,
    AdminNewChildComponent,
    ChildComponent,
    DonateComponent,
    LoginComponent,
    StoryComponent,
    ProfileComponent,
    EventComponent,
    AdminEventComponent,
    HelpComponent
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderRouterModule, 
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
