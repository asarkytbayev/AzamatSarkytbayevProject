import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  /**
   * Injects dependencies
   */
  constructor(private auth: AuthenticationService, private router: Router) {}

  /**
   * Tells angular to load player profile only
   * if the user is logged in
   */
  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
