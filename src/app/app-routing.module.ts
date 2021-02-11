import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { HelpingComponent } from './pages/helping/helping.component';

import { AdminComponent } from './admin/admin.component';
import { AdminStoryComponent } from './admin/admin-story/admin-story.component';
import { AdminNewChildComponent } from './admin/admin-new-child/admin-new-child.component';
import { AdminEventComponent } from './admin/admin-event/admin-event.component';
import { ChildComponent } from './pages/child/child.component';
import { DonateComponent } from './admin/donate/donate.component';
import { StoryComponent } from './pages/story/story.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileGuard } from './shared/guards/profile.guard';
import { EventComponent } from './pages/event/event.component';
import { HelpComponent } from './admin/help/help.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'stories', component: StoriesComponent},
  { path: 'helping', component: HelpingComponent},
  { path: 'event', component: EventComponent},
  { path: 'home/:id', component: ChildComponent},
  { path: 'stories/:id', component: StoryComponent},
  { path: 'admin-login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'admin-new-child', pathMatch: 'full'},
    {path: 'admin-story', component: AdminStoryComponent },
    {path: 'admin-new-child', component: AdminNewChildComponent},
    {path: 'admin-donate', component: DonateComponent},
    {path: 'admin-event', component: AdminEventComponent},
    {path: 'admin-help', component: HelpComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class HttpClientModule { }