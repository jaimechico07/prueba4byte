import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ToastModule, ButtonModule, InputTextModule, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  onSubmit(): void {
    if (!this.username && !this.password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Please enter username and password',
        life: 5000,
      });
      return;
    }

    if (!this.username) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please enter username',
      });
      return;
    }

    if (!this.password) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please enter password',
      });
      return;
    }

    this.loading.set(true);
    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Welcome!',
            detail: 'Login successful!',
            life: 3000,
          });
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid credentials. Use: mor_2314 / 83r5^_',
            life: 5000,
          });
        },
      });
  }
}
