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
    this.firebaseDatabase.database.ref(`/${user.courseCode}/`).push(
      new UserDetails(user.courseCode, user.userId, user.timeStamp, user.content)
    ).then(
      () => {
        console.log(`Message with content ---> ${user.content} was just sent.`);
        // this.messagesChanged.next(this.messages);
      }
    );
  }

}
