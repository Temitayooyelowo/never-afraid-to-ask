import { Component, OnInit, ViewChild, OnDestroy, AfterViewChecked  } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { UserDetails } from './userDetails.model';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit, OnDestroy, AfterViewChecked {
  user: UserDetails;
  messages: UserDetails[] = [];
  messagesTest: Observable<any[]>;
  @ViewChild('f') form: NgForm;
  classroom: string;
  routeSubscription;
  messageChangedSubscription;

  constructor(private route: ActivatedRoute,
              private messagesService: MessagesService,
              private firebaseDatabase: AngularFireDatabase) {

    }

  ngOnInit() {
    this.user = new UserDetails('', '', new Date(), '');

    this.routeSubscription = this.route.queryParams.pipe(
      filter(params => params.room))
      .subscribe(params => {
        this.classroom = params.room;
        this.messagesService.loadMessages(this.classroom);
      });

    this.messageChangedSubscription = this.messagesService.messagesChanged
      .subscribe(
        (messages: UserDetails[]) => {
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

  // loadMessages() {
  //   this.messagesService.loadMessages(this.classroom);
  // }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.messageChangedSubscription.unsubscribe();
  }

  scrollToBottom() {
    setTimeout(() => {
      const messageList = document.getElementById('chat-messages');
      messageList.scrollTop = messageList.scrollHeight;
      document.getElementById('chat-messages').focus();
    }, 1000);
  }
}
