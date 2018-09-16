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
    this.getAvailableCourses();
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
    console.log(this.studentForm.value.course);
    // this.router.navigate(['/chat-app']);
  }

  // isProfessor() {

  // }

}
