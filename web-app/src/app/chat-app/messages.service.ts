import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { UserDetails } from './userDetails.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesChanged = new Subject<UserDetails[]>();
  private messages: UserDetails[] = [];

  constructor(private firebaseDatabase: AngularFireDatabase) { }

  sendMessage(user: UserDetails) {
    const message: UserDetails = new UserDetails(user.courseCode, user.userId, user.timeStamp, user.content);

    this.firebaseDatabase.database.ref(`/${user.courseCode}/`).push(message).then(
      () => {
        console.log(`Message with content ---> ${user.content} was just sent.`);
      }
    );
  }

  loadMessages(classroom: string) {
    const callback = (snap) => {
      const data = snap.val();
      this.messages.push({
        content: data.content,
        courseCode: data.courseCode,
        timeStamp: data.timeStamp,
        userId: data.userId
      });
      this.messagesChanged.next(this.messages.slice());
    };

    this.firebaseDatabase.database.ref(`/${classroom}/`).limitToLast(12).on('child_added', callback);
    this.firebaseDatabase.database.ref(`/${classroom}/`).limitToLast(12).on('child_changed', callback);
  }


  getMessages() {
    return this.messages.slice(); /** Returns copy of messages array */
  }

}
