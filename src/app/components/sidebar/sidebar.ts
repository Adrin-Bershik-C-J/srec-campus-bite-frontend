import { Component, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
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