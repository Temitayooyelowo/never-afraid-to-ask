import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatAppComponent } from './social/chat-app/chat-app.component';
import { AboutUsComponent } from './help/aboutus/aboutus.component';
import { HowToComponent } from './help/howto/howto.component';
import { ClassroomComponent } from './social/classroom/classroom.component';

const appRoutes: Routes = [
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
