import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';
import { TokenService } from '../../../services/token.service';
import { LayoutService } from '../../../services/layout.service';
import { LoginModel } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: Auth,
    private tokenService: TokenService,
    private layoutService: LayoutService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      rememberMe: [false]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      
      const loginData = new LoginModel();
      loginData.email = this.loginForm.value.email;
      loginData.password = this.loginForm.value.password;
      
      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.tokenService.setToken(response.token);
          this.tokenService.setUserData({
            email: response.email,
            name: response.name,
            role: response.role
          });
          this.layoutService.setAuthenticated(true);
          
          // Role-based redirection
          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/user/dashboard']);
          }
          
          this.isLoading.set(false);
        },
        error: (error) => {
          this.errorMessage.set(error.error?.message || 'Login failed. Please try again.');
          this.isLoading.set(false);
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
