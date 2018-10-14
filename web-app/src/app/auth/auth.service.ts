import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription, Subject } from 'rxjs';

import { UserService } from '../core/user/user.service';
import { User } from '../core/user/user.model';

export class UserInfo {
    email: string;
    photoURL: string;
    roles: {
      student: boolean,
      instructor: boolean,
      admin: boolean
    };
    school: string;

    constructor(email: string, photoURL: string, roles, school: string) {
      this.email = email;
      this.photoURL = photoURL;
      this.roles = roles;
      this.school = school;
    }
}

export class CoursesTaken {
  courseCode: '';
  professor: '';
  school: '';

  constructor(courseCode, professor, school) {
    this.courseCode = courseCode;
    this.professor = professor;
    this.school = school;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit, OnDestroy {
  token: string;
  STUDENT = 'student';
  INSTRUCTOR = 'instructor';
  ADMIN = 'admin';
  role: string;
  user: User;
  userSubscription: Subscription;
  private authStatus = 'signUp';
  authStatusSubscription = new Subject<string>();

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseDatabase: AngularFireDatabase,
              private userService: UserService,
              private router: Router) {
              }

  ngOnInit() {
  }

  toggleStatus() {
    console.log('Old status is -->', this.authStatus);
    if (this.authStatus === 'signUp' || !this.authStatus) {
      this.authStatus = 'signIn';
    } else {
      this.authStatus = 'signUp';
    }
    console.log('New status is --> ', this.authStatus);
    this.authStatusSubscription.next(this.authStatus);
  }

  getUserInformation() {
    this.userService.getUserInfo();
    this.userSubscription = this.userService.userData.subscribe(
      (user) => {
        this.user = user;
        this.role = user.role;
      }
    );
  }

  signupUserWithEmail(
      email: string, password: string, userRole: string = 'student', school: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(
    (user) => {

      this.role = userRole;
      this.firebaseDatabase.database.ref('/users').push(new UserInfo(email, '', userRole, school));
      this.loginUserWithEmail(email, password);
      this.router.navigate(['/home']);
    })
    .catch(
      error => console.error('An error occured when signining up the user.')
    );
  }

  loginUserWithEmail(email, password) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          console.log(this.firebaseAuth.auth.currentUser);
          this.firebaseAuth.auth.currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                this.getUserInformation();
              }
            );
        }
      )
      .catch(
        error => console.error(error)
      );
  }

  logoutUser() {
    this.firebaseAuth.auth.signOut();
    this.token = null;
    this.role = null;
  }

  getToken() {
    /** Returns a promise */
    this.firebaseAuth.auth.currentUser.getIdToken().then(
      (token: string) => {
        this.token = token;
      }
    );
    return this.token;
  }

  isAuthenticated() {
    // this.token = !this.token ? this.firebaseAuth.auth.currentUser ? this.getToken() : this.token : this.token;
    return !!this.token;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
