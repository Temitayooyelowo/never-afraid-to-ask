import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FirebaseApp, FirebaseDatabase } from '@angular/fire';

import { UserInfo } from './UserInfo.model';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: UserInfo;

  constructor(private authService: AuthService,
              private ref: ChangeDetectorRef,
              private firebaseAuth: AngularFireAuth,
              private angularFireDatabase: AngularFireDatabase) { }

  ngOnInit() {
    const user = this.firebaseAuth.auth.currentUser;
    if (!user) {
      return;
    }
    const userEmail = user.email;

    this.angularFireDatabase.database.ref().child('users').orderByChild('email').equalTo(userEmail)
    .on('value', (snapshot) => {
      let data = snapshot.val();

      console.log(data);

      snapshot.forEach(function(data2) {
        const key = data2.key;
        data = data[key];
      });

      this.user = new UserInfo(data['email'], data['photoURL'],
      data['roles'][0].index || 'Unknown', data['school'] || 'Unknown');

      this.ref.detectChanges();
    });

  }
}
