import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { MessagesModel } from './messages.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesChanged = new Subject<MessagesModel[]>();
  private messages: MessagesModel[] = [];

  constructor(private firebaseDatabase: AngularFireDatabase) { }

  sendMessage(user: MessagesModel) {
    const message: MessagesModel = new MessagesModel(user.courseCode, user.userId, user.timeStamp, user.content);

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

  getMessagesLength() {
    return this.messages.length;
  }

  getMessage(index: number) {
    return this.messages[index];
  }

}
