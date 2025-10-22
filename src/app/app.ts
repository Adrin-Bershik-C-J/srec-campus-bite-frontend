import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Sidebar } from './components/sidebar/sidebar';
import { LayoutService } from './services/layout.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private document = inject(DOCUMENT);
  
  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private tokenService: TokenService
  ) {}

  get isAuthenticated() {
    return this.layoutService.isAuthenticated;
  }

  ngOnInit() {
    this.initializeTheme();
    this.checkAuthenticationStatus();
    this.setupRouterListener();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Use system default
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = prefersDark ? 'dark' : 'light';
      this.document.documentElement.setAttribute('data-theme', theme);
    }
  }

  private checkAuthenticationStatus() {
    const isLoggedIn = this.tokenService.isTokenValid();
    this.layoutService.setAuthenticated(isLoggedIn);
  }

  private setupRouterListener() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const isLoggedIn = this.tokenService.isTokenValid();
      this.layoutService.setAuthenticated(isLoggedIn);
    });
  }
}
