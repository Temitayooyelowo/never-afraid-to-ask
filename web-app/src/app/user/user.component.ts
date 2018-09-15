import { Component, OnInit } from '@angular/core';

export class UserInfo {
  email: string;
  photoURL: string;
  role: string;
  school: string;

  constructor(email: string, photoURL: string, role: string, school: string) {
    this.email = email;
    this.photoURL = photoURL;
    this.role = role;
    this.school = school;
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: UserInfo = new UserInfo('the-hidden-tent@gmail.com', '', 'student', 'Carleton University');

  constructor() { }

  ngOnInit() {
  }

}
