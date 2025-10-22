import { Component, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { TokenService } from '../../services/token.service';
import { LayoutService } from '../../services/layout.service';
import { VerifyUserOTP } from '../../models/auth.model';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './verify.html',
  styleUrl: './verify.css'
})
export class Verify implements OnInit {
  verifyForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  email = signal('');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: Auth,
    private tokenService: TokenService,
    private layoutService: LayoutService
  ) {
    this.verifyForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email.set(params['email']);
      } else {
        this.router.navigate(['/register']);
      }
    });
  }

  get otp() { return this.verifyForm.get('otp'); }

  onSubmit() {
    if (this.verifyForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      
      const verifyData = new VerifyUserOTP();
      verifyData.email = this.email();
      verifyData.otp = this.verifyForm.value.otp;
      
      this.authService.verify(verifyData).subscribe({
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
            this.router.navigate(['/dashboard']);
          }
          
          this.isLoading.set(false);
        },
        error: (error) => {
          this.errorMessage.set(error.error?.message || 'Verification failed. Please try again.');
          this.isLoading.set(false);
        }
      });
    } else {
      this.verifyForm.get('otp')?.markAsTouched();
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.verifyForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['pattern']) return 'OTP must be 6 digits';
    }
    return '';
  }
}