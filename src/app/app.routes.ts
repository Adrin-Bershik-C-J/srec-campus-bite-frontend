import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Verify } from './pages/auth/verify/verify';
import { Dashboard } from './pages/user/dashboard/dashboard';
import { AdminDashboard } from './pages/admin/dashboard/admin-dashboard';
import { AdminUsers } from './pages/admin/users/admin-users';
import { AdminProviders } from './pages/admin/providers/admin-providers';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login,
        canActivate: [PublicGuard]
    },
    {
        path: 'register',
        component: Register,
        canActivate: [PublicGuard]
    },
    {
        path: 'verify',
        component: Verify,
        canActivate: [PublicGuard]
    },
    {
        path: 'user/dashboard',
        component: Dashboard,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/dashboard',
        component: AdminDashboard,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/users',
        component: AdminUsers,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/providers',
        component: AdminProviders,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
