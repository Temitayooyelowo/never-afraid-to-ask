import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { WildCardRoutingModule } from './core/page-not-found/wildcard-routing.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    FormsModule,
    AppRoutingModule,
    WildCardRoutingModule /** Has to be in the last position */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
