import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

import { UserDetails } from './userDetails.model';
import { ChatAppService } from './chatApp.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit, OnDestroy {
  user: UserDetails;
  messages: UserDetails[] = [];
  messagesTest: Observable<any[]>;
  @ViewChild('f') form: NgForm;
  classroom: string;
  subscription;

  constructor(private chatAppService: ChatAppService,
              private ref: ChangeDetectorRef,
              private route: ActivatedRoute,
              private firebaseDatabase: AngularFireDatabase) {

    }

  ngOnInit() {
    this.user = new UserDetails('COMP 1405', '1', new Date(), 'Welcome');

    this.subscription = this.route.queryParams.pipe(
      filter(params => params.room)
    )
    .subscribe(params => {
      this.classroom = params.room;
      console.log(this.classroom);
    });


    this.loadMessages();
  }

  onSendMessage() {
    const message = this.form.value.message;
    this.user.content = message;
    this.user.courseCode = this.classroom;
    this.chatAppService.sendMessage(this.user);
    this.form.reset({});
  }

  loadMessages() {
    const callback = (snap) => {
      const data = snap.val();
      this.messages.push({
        content: data.content,
        courseCode: data.courseCode,
        timeStamp: data.timeStamp,
        userId: data.userId
      });
      this.ref.detectChanges();
    };

    this.firebaseDatabase.database.ref(`/${this.classroom}/`).limitToLast(12).on('child_added', callback);
    this.firebaseDatabase.database.ref(`/${this.classroom}/`).limitToLast(12).on('child_changed', callback);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
