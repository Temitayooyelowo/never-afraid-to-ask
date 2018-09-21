import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'home', component: HomeComponent},
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
export class CoreRoutingModule {

}
