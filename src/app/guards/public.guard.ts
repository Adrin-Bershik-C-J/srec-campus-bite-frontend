import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const PublicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.isTokenValid()) {
    const userData = tokenService.getUserData();
    if (userData?.role === 'ADMIN') {
      router.navigate(['/admin/dashboard']);
    } else {
      router.navigate(['/user/dashboard']);
    }
    return false;
  }

  return true;
};