import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api
      .post({ email: this.email, password: this.password }, 'api/auth/login')
      .subscribe({
        next: (res) => {
          localStorage.setItem('accessToken', res.accessToken);
          this.router.navigate(['/tasks']); // redirect to tasks page
        },
        error: (err) => {
          alert(err.error.error || 'Login failed');
        },
      });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
