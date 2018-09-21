import { Component, OnDestroy } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'never-afraid-to-ask';

  constructor(private authService: AuthService) {

  }

  ngOnDestroy() {
    this.authService.logoutUser();
  }
}
