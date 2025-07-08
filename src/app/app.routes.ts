import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Shop } from './components/shop/shop';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Carrito } from './components/carrito/carrito';
import { Dashboard } from './components/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'shop',
        component: Shop,
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'register',
        component: Register,
    },
    {
        path: 'carrito',
        component: Carrito,
        canActivate: [AuthGuard],
    },
    {
        path: 'admin/dashboard',
        component: Dashboard,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
