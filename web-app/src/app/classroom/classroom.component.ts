import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Params } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  currentMessage: { };
  previousMessage: { };
  classroom: string;

  constructor(private ref: ChangeDetectorRef,
              private route: ActivatedRoute,
              private firebaseDatabase: AngularFireDatabase) { }

  ngOnInit() {

      this.route.queryParams.pipe(
        filter(params => params.room)
      )
      .subscribe(params => {

        this.classroom = params.room;
        console.log(this.classroom); // popular
      });

  }

  loadMessages() {
    const callback = (snap) => {
      const data = snap.val();
      this.currentMessage = {
        content: data.content,
        courseCode: data.courseCode,
        timeStamp: data.timeStamp,
        userId: data.userId
      };
      this.ref.detectChanges();
    };

    this.firebaseDatabase.database.ref(`/${this.classroom}/`).limitToLast(2).on('child_added', callback);
    this.firebaseDatabase.database.ref(`/${this.classroom}/`).limitToLast(2).on('child_changed', callback);
  }

}
