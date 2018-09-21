import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;

  constructor(private userService: UserService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userService.getUserInfo();
    this.userSubscription = this.userService.userData.subscribe(
      (user) => {
        this.user = user;
        console.log(this.user);
        this.cdRef.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
