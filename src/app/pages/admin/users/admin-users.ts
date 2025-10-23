import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { UserDto } from '../../../models/admin.model';
import { PaginatedResponse } from '../../../models/common.model';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit {
  users = signal<UserDto[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  currentPage = signal(0);
  totalPages = signal(0);
  totalElements = signal(0);
  selectedRole = signal<string>('');

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(page = 0, role?: string) {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.adminService.getAllUsers(role, page, 10).subscribe({
      next: (response: PaginatedResponse<UserDto>) => {
        this.users.set(response.content || []);
        this.currentPage.set(response.number || 0);
        this.totalPages.set(response.totalPages || 1);
        this.totalElements.set(response.totalElements || 0);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load users');
        this.isLoading.set(false);
      }
    });
  }

  onRoleFilter(event: Event) {
    const role = (event.target as HTMLSelectElement).value;
    this.selectedRole.set(role);
    this.loadUsers(0, role || undefined);
  }

  onPageChange(page: number) {
    this.loadUsers(page, this.selectedRole() || undefined);
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'ADMIN': return 'role-admin';
      case 'PROVIDER': return 'role-provider';
      case 'USER': return 'role-user';
      default: return '';
    }
  }

  getSerialNumber(index: number): number {
    const currentPage = this.currentPage() || 0;
    return (currentPage * 10) + index + 1;
  }
}