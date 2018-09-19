import { Component, OnInit, ViewChild, OnDestroy, AfterViewChecked  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { MessagesModel } from '../messages.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit, OnDestroy, AfterViewChecked {
  user: MessagesModel;
  messages: MessagesModel[] = [];
  messagesTest: Observable<any[]>;
  @ViewChild('f') form: NgForm;
  classroom: string;
  routeSubscription: Subscription;
  messageChangedSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private messagesService: MessagesService) { }

  ngOnInit() {
    this.user = new MessagesModel('', '', new Date(), '');

    this.routeSubscription = this.route.queryParams.pipe(
      filter(params => params.room))
      .subscribe(params => {
        this.classroom = params.room;
        this.messagesService.loadMessages(this.classroom);
      });

    this.messageChangedSubscription = this.messagesService.messagesChanged
      .subscribe(
        (messages: MessagesModel[]) => {
          this.messages = messages;
        }
      );
    this.messages = this.messagesService.getMessages();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  onSendMessage() {
    const message = this.form.value.message;
    this.user.content = message;
    this.user.courseCode = this.classroom;

    this.messagesService.sendMessage(this.user);
    this.form.reset({});
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.messageChangedSubscription.unsubscribe();
  }

  scrollToBottom() {
    setTimeout(() => {
      const messageList = document.getElementById('chat-messages');
      if (!!messageList)  {
        messageList.scrollTop = messageList.scrollHeight;
        document.getElementById('chat-messages').focus();
      }
    }, 1000);
  }
}
