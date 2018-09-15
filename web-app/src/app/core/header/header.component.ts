import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogoff() {
    this.router.navigate(['/home']);
    this.authService.logoutUser();
  }
}
