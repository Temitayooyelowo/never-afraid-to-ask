import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { CollectiveModule } from '../general/collective.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './user/user.service';
import { UserComponent } from './user/user.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    UserComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    CollectiveModule,
    FormsModule,
    CoreRoutingModule
  ],
  exports: [
    CoreRoutingModule,
    HeaderComponent
  ],
  providers: [
    UserService
  ]
})
export class CoreModule {

}
