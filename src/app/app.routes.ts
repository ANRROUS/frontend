import { Routes } from '@angular/router';
import { Shop } from './components/shop/shop';
import { Home } from './components/home/home';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Carrito } from './components/carrito/carrito';
import { Dashboard } from './components/dashboard/dashboard';

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
    },
    {
        path: 'admin/dashboard',
        component: Dashboard,
    },
];
