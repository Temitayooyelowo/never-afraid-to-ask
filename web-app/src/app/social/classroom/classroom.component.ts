import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MessagesService } from '../messages.service';
import { MessagesModel } from '../messages.model';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit, OnDestroy {
  currentMessage: MessagesModel;
  previousMessage: MessagesModel;
  messagesLength: number;
  classroom: string;
  routeSubscription: Subscription;
  messageChangedSubscription: Subscription;

  constructor(private messagesService: MessagesService,
              private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.routeSubscription = this.route.queryParams.pipe(
      filter(params => params.room))
    .subscribe(params => {
      this.classroom = params.room;
      this.messagesService.loadMessages(this.classroom);
    });

    this.messageChangedSubscription = this.messagesService.messagesChanged
      .subscribe(
        (messages: MessagesModel[]) => {
          this.messagesLength = messages.length;

          /** If array has length of 2 then it has index 0 and index 1 */
          if (this.messagesLength === 1) {
            this.currentMessage = messages[this.messagesLength - 1];
            this.previousMessage = undefined;
          } else {
            this.currentMessage = messages[this.messagesLength - 1];
            this.previousMessage = messages[this.messagesLength - 2];
          }

          this.cdRef.detectChanges();
        }
      );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.messageChangedSubscription.unsubscribe();
  }
}
