import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'; // updated

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_KEY = 'accessToken';

  constructor(private router: Router) {}

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = (jwt_decode as any)(token); // updated
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        this.logout();
        return false;
      }
      return true;
    } catch (err) {
      this.logout();
      return false;
    }
  }

  getUserInfo(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = (jwt_decode as any)(token);
      return decoded;
    } catch (err) {
      return null;
    }
  }
}
