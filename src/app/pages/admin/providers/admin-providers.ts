import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { ProviderRegisterRequest } from '../../../models/admin.model';

@Component({
  selector: 'app-admin-providers',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-providers.html',
  styleUrl: './admin-providers.css'
})
export class AdminProviders {
  providerForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  showPassword = signal(false);

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.providerForm = this.fb.group({
      providerName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    if (this.providerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const request: ProviderRegisterRequest = this.providerForm.value;

      this.adminService.registerProvider(request).subscribe({
        next: (response) => {
          this.successMessage.set('Provider registered successfully!');
          this.providerForm.reset();
          this.isLoading.set(false);
        },
        error: (error) => {
          this.errorMessage.set(error.error?.message || 'Failed to register provider');
          this.isLoading.set(false);
        }
      });
    } else {
      Object.keys(this.providerForm.controls).forEach(key => {
        this.providerForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.providerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}