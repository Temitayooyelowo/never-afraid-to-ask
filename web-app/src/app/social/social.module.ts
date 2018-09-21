import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatAppComponent } from './chat-app/chat-app.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { SocialRoutingModule } from './social-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SocialRoutingModule
  ],
  declarations: [
    ChatAppComponent,
    ClassroomComponent
  ]
})
export class SocialModule { }
