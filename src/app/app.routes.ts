import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Verify } from './pages/verify/verify';
import { Dashboard } from './pages/dashboard/dashboard';
import { AdminDashboard } from './pages/admin/dashboard/admin-dashboard';
import { AdminUsers } from './pages/admin/users/admin-users';
import { AdminProviders } from './pages/admin/providers/admin-providers';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'verify',
        component: Verify
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'admin/dashboard',
        component: AdminDashboard
    },
    {
        path: 'admin/users',
        component: AdminUsers
    },
    {
        path: 'admin/providers',
        component: AdminProviders
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
