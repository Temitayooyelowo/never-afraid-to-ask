import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    return this.authService.isAuthenticated();
  }

  canLoad(route: Route) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    return this.authService.isAuthenticated();
  }
}
