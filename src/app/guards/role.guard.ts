import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  const expectedRoles = route.data['roles'] as string[];
  const userRole = tokenService.getUserRole();

  if (
    userRole &&
    expectedRoles.includes(userRole) &&
    tokenService.isTokenValid()
  ) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
