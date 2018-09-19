import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { WildCardRoutingModule } from './core/page-not-found/wildcard-routing.module';
import { UserComponent } from './user/user.component';
import { AboutUsComponent } from './help/aboutus/aboutus.component';
import { CollectiveModule } from './collective/collective.module';
import { HowToComponent } from './help/howto/howto.component';
import { SocialModule } from './social/social.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutUsComponent,
    HowToComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CollectiveModule,
    AuthModule,
    SocialModule,
    FormsModule,
    WildCardRoutingModule /** Has to be in the last position */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
