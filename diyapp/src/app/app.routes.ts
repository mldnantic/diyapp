import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { SignUpComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: SignUpComponent
    },
    {
        path: 'adminpanel',
        loadComponent: () =>
            import('./components/adminpanel/adminpanel.component').then((c) => c.AdminPanelComponent),
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
