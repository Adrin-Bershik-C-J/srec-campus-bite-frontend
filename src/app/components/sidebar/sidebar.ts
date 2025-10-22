import { Component, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">SREC Campus Bite</h2>
        <button class="theme-toggle" (click)="toggleTheme()">
          @if (isDarkMode) {
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
          } @else {
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
            </svg>
          }
        </button>
      </div>
      
      <nav class="sidebar-nav">
        @if (getUserRole() === 'ADMIN') {
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
          </a>
          <a routerLink="/admin/users" routerLinkActive="active" class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Users
          </a>
          <a routerLink="/admin/providers" routerLinkActive="active" class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 000 2h1v11a3 3 0 003 3h6a3 3 0 003-3V9h1a1 1 0 000-2zM10 6a2 2 0 014 0v1h-4V6zm4 15H10a1 1 0 01-1-1V9h6v11a1 1 0 01-1 1z"/>
            </svg>
            Providers
          </a>
        } @else {
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
          </a>
        }
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-name">{{ getUserName() }}</div>
          <div class="user-email">{{ getUserEmail() }}</div>
        </div>
        <button class="logout-btn" (click)="logout()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-primary);
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }

    .sidebar-header {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--border-primary);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sidebar-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      margin: 0;
    }

    .theme-toggle {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: var(--spacing-xs);
      border-radius: var(--border-radius-sm);
      transition: color var(--transition-fast);
    }

    .theme-toggle:hover {
      color: var(--text-primary);
    }

    .sidebar-nav {
      flex: 1;
      padding: var(--spacing-md);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--border-radius-md);
      transition: all var(--transition-fast);
      margin-bottom: var(--spacing-xs);
    }

    .nav-item:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
    }

    .nav-item.active {
      background: var(--primary-50);
      color: var(--primary-600);
    }

    [data-theme="dark"] .nav-item.active {
      background: rgba(14, 165, 233, 0.1);
    }

    .sidebar-footer {
      padding: var(--spacing-lg);
      border-top: 1px solid var(--border-primary);
    }

    .user-info {
      margin-bottom: var(--spacing-md);
    }

    .user-name {
      font-weight: var(--font-weight-medium);
      color: var(--text-primary);
      font-size: var(--font-size-sm);
    }

    .user-email {
      color: var(--text-secondary);
      font-size: var(--font-size-xs);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      width: 100%;
      padding: var(--spacing-sm);
      background: none;
      border: 1px solid var(--border-primary);
      border-radius: var(--border-radius-md);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .logout-btn:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
    }
  `]
})
export class Sidebar {
  private document = inject(DOCUMENT);
  isDarkMode = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.isDarkMode = this.document.documentElement.getAttribute('data-theme') === 'dark';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  getUserName(): string {
    const userData = this.tokenService.getUserData();
    return userData?.name || 'User';
  }

  getUserEmail(): string {
    const userData = this.tokenService.getUserData();
    return userData?.email || '';
  }

  getUserRole(): string {
    const userData = this.tokenService.getUserData();
    return userData?.role || '';
  }

  logout() {
    this.tokenService.clearToken();
    this.layoutService.setAuthenticated(false);
    this.router.navigate(['/login']);
  }
}