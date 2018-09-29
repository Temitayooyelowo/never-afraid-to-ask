import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { GeneralModule } from '../general/general.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    UserComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    GeneralModule,
    MaterialModule,
    FormsModule,
    CoreRoutingModule
  ],
  exports: [
    CoreRoutingModule,
    HeaderComponent
  ]
})
export class CoreModule {

}
