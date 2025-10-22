import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Welcome to SREC Campus Bite</h1>
        <p>Hello, {{ getUserName() }}!</p>
        <p>Role: {{ getUserRole() }}</p>
      </div>
      <div class="dashboard-content">
        <p>Dashboard content will be implemented here.</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: var(--spacing-lg);
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .dashboard-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }
    
    .dashboard-header h1 {
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
    }
    
    .dashboard-content {
      background: var(--bg-secondary);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--border-primary);
    }
  `]
})
export class Dashboard {
  constructor(private tokenService: TokenService) {}

  getUserName(): string {
    const userData = this.tokenService.getUserData();
    return userData?.name || 'User';
  }

  getUserRole(): string {
    const userData = this.tokenService.getUserData();
    return userData?.role || 'Unknown';
  }
}