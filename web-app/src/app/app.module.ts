import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { WildCardRoutingModule } from './core/page-not-found/wildcard-routing.module';
import { UserComponent } from './user/user.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { CollectiveModule } from './collective/collective.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CollectiveModule,
    AuthModule,
    WildCardRoutingModule /** Has to be in the last position */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
