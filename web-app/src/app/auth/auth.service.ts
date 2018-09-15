import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


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

export class AuthService {
  token: string;
  STUDENT = 'student';
  INSTRUCTOR = 'instructor';
  ADMIN = 'admin';

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseDatabase: AngularFireDatabase,
              private router: Router) { }

  signupUserWithEmail(
      email: string, password: string, userRole: string = 'lkjlkj') {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(
    (user) => {

      // if (userRole === 'professor') {
      //   this.firebaseDatabase.database.ref('/courses-taken').push(new CoursesTaken());
      // }

      const userRoles = {
        'student': userRole === this.STUDENT,
        'instructor': userRole === this.INSTRUCTOR,
        'admin': userRole === this.ADMIN
      };

      this.firebaseDatabase.database.ref('/users').push(new UserInfo(email, '', userRoles, ''));
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
          this.firebaseAuth.auth.currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
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

}
