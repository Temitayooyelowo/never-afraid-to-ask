import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { UserDetails } from './userDetails.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatAppService {

  messages: UserDetails[] = [];
  // messagesChanged = new Subject<UserDetails[]>();

  constructor(private firebaseDatabase: AngularFireDatabase) { }

  sendMessage(user: UserDetails) {
    this.firebaseDatabase.database.ref('/messages').push(
      new UserDetails(user.courseCode, user.userId, user.timeStamp, user.content)
    ).then(
      () => {
        console.log(`Message with content ---> ${user.content} was just sent.`);
        // this.messagesChanged.next(this.messages);
      }
    );
  }

  // loadMessages() {
  //   this.firebaseDatabase.database.ref('/messages').limitToLast(10).on('child_added', snap => {
  //     const data = snap.val();
  //     this.messages.push({
  //       content: data.content,
  //       courseCode: data.courseCode,
  //       timeStamp: data.timeStemp,
  //       userId: data.userId
  //     });
  //     this.messagesChanged.next(this.messages);
  //   });

  //   this.firebaseDatabase.database.ref('/messages').limitToLast(12).on('child_changed', snap => {
  //     const data = snap.val();
  //     this.messages.push({
  //       content: data.content,
  //       courseCode: data.courseCode,
  //       timeStamp: data.timeStemp,
  //       userId: data.userId
  //     });

  //     this.messagesChanged.next(this.messages);
  //   });
  // }

}
