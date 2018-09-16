import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { WildCardRoutingModule } from './core/page-not-found/wildcard-routing.module';
import { UserComponent } from './user/user.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { CollectiveModule } from './collective/collective.module';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChatAppComponent,
    AboutUsComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CollectiveModule,
    AuthModule,
    FormsModule,
    WildCardRoutingModule /** Has to be in the last position */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
