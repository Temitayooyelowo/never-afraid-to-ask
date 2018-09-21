import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGaurd } from './auth/auth-guard.service';

const appRoutes: Routes = [
  {path: 'social', loadChildren: './social/social.module#SocialModule', canLoad: [AuthGaurd]},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
