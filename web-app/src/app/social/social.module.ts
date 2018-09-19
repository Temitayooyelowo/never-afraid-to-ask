import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessagesService } from './messages.service';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { ClassroomComponent } from './classroom/classroom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ChatAppComponent,
    ClassroomComponent
  ]
})
export class SocialModule { }
