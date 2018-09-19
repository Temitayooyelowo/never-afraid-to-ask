import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { UserComponent } from './user/user.component';
import { ChatAppComponent } from './social/chat-app/chat-app.component';
import { AboutUsComponent } from './help/aboutus/aboutus.component';
import { HowToComponent } from './help/howto/howto.component';
import { ClassroomComponent } from './social/classroom/classroom.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'chat-app', component: ChatAppComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'howto', component: HowToComponent},
  {path: 'classroom', component: ClassroomComponent },
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
