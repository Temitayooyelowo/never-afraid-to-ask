import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: string;
  @ViewChild('f') ngForm: NgForm;
  @ViewChild('studentForm') studentForm: NgForm;
  availableCourses: string[] = [];

  constructor(public authService: AuthService,
              private router: Router,
              private firebaseDatabase: AngularFireDatabase) { }

  ngOnInit() {
    if (!!this.isUserLoggedIn()) {
      this.getAvailableCourses();
    }
  }

  isUserLoggedIn() {
    return this.authService.isAuthenticated();
  }

  onCreateCourse() {
    this.firebaseDatabase.database.ref('/availableCourses').push(this.ngForm.value.course);
    this.ngForm.reset();
  }

  getAvailableCourses() {
    this.firebaseDatabase.database.ref('/availableCourses').once('value').then(
      (snapshot) => {
        const courses = snapshot.val();
        const obj = Object.keys(courses);
        this.availableCourses = obj.map((k) => {
            return courses[k];
        });
      }
    );
  }

  onChooseRoom() {
    const course = this.studentForm.value.course;

    const role = this.authService.role;

    if (!course || !role) {
      return;
    }

    if (role === 'student') {
      this.router.navigate(['/chat-app'], { queryParams: { room: course } });
    } else {
      this.router.navigate(['/classroom'], {queryParams: { room: course}});
    }
    // this.router.navigate(['/chat-app']);
  }

  // isProfessor() {

  // }

}
