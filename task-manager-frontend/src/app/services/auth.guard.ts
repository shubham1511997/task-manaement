// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const restrictedForLoggedIn = route.data['restrictedForLoggedIn'] ?? false;

    if (restrictedForLoggedIn && isLoggedIn) {
      // Logged-in users should not access this route
      this.router.navigate(['/tasks']);
      return false;
    }

    if (!restrictedForLoggedIn && !isLoggedIn) {
      // Non-logged-in users should not access protected route
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
