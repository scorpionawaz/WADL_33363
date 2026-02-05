import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: Auth, private router: Router) {}

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.successMessage = 'Login successful! Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 1500);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }

  tryDemo(): void {
    this.email = 'demo@example.com';
    this.password = 'password123';
    this.login();
  }
}
