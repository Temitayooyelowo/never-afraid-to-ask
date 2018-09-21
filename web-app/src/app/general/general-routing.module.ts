import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './help/aboutus/aboutus.component';
import { HowToComponent } from './help/howto/howto.component';

export const appRoutes: Routes = [
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'howto', component: HowToComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GeneralRoutingModule { }
