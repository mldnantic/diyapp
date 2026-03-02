import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { SignUpComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/homepage/homepage.component').then((c) => c.HomePageComponent)
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./components/userpanel/userpanel.component').then((c) => c.UserPanelComponent),
        canActivate: [AuthGuard],
        data: { roles: ['user', 'moderator', 'admin'] }
    },
    {
        path: 'moderatorpanel',
        loadComponent: () =>
            import('./components/moderatorpanel/moderatorpanel.component').then((c) => c.ModeratorPanelComponent),
        canActivate: [AuthGuard],
        data: { roles: ['moderator', 'admin'] }
    },
    {
        path: 'adminpanel',
        loadComponent: () =>
            import('./components/adminpanel/adminpanel.component').then((c) => c.AdminPanelComponent),
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'itemedit/:id',
        loadComponent: () =>
            import('./components/itemedit/itemedit.component').then((c) => c.ItemEditComponent),
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
