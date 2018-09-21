import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData = new Subject<User>();
  constructor(private firebaseAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase) {
    }

  getUserInfo() {
    console.log('In get user');
    const user = this.firebaseAuth.auth.currentUser;
    if (!user) {
      return;
    }
    const userEmail = user.email;
    this.angularFireDatabase.database.ref().child('users').orderByChild('email').equalTo(userEmail)
    .on('value', (snapshot) => {
      let data = snapshot.val();
      snapshot.forEach(function(data2) {
        const key = data2.key;
        data = data[key];
      });
      const newUser =  new User(data['email'], data['photoURL'],
      data['roles'][0].index || 'Unknown', data['school'] || 'Unknown');
      this.userData.next(newUser);
      return newUser;
    });
  }
}
