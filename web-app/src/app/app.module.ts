import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { WildCardRoutingModule } from './core/page-not-found/wildcard-routing.module';
import { AboutUsComponent } from './help/aboutus/aboutus.component';
import { CollectiveModule } from './general/collective.module';
import { HowToComponent } from './help/howto/howto.component';
import { SocialModule } from './social/social.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule,
    WildCardRoutingModule /** Has to be in the last position */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
