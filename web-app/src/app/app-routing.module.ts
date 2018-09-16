import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { UserComponent } from './user/user.component';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { HowToComponent } from './howto/howto.component';
import { ClassroomComponent } from './classroom/classroom.component';

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
