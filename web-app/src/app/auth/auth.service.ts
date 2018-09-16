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
  role: string;

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseDatabase: AngularFireDatabase,
              private router: Router) { }

  getUserInformation() {

    const user = this.firebaseAuth.auth.currentUser;
    if (!user) {
      return;
    }
    const userEmail = user.email;

    this.firebaseDatabase.database.ref().child('users').orderByChild('email').equalTo(userEmail)
    .once('value').then((snapshot) => {
      let data = snapshot.val();
      console.log(data);

      snapshot.forEach((data2) => {
        const key = data2.key;
        data = data[key];
        if (!!data && !!data['roles']) {
          this.role = data['roles'][0].index;
        }
      });

      return data;
    });
    // return this.firebaseAuth.auth.currentUser;
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

}
