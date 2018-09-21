import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGaurd } from '../auth/auth-guard.service';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { ClassroomComponent } from './classroom/classroom.component';

const appRoutes: Routes = [
  {path: 'chat-app', component: ChatAppComponent, canActivate: [AuthGaurd]},
  {path: 'classroom', component: ClassroomComponent, canActivate: [AuthGaurd]},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SocialRoutingModule {

}
