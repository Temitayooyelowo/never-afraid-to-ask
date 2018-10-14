import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const authRoutes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
