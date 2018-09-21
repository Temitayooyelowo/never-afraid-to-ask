import { Component, OnInit } from '@angular/core';

import { User } from './user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }
}
