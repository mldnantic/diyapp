import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/adminpanel/adminpanel.component').then((c) => c.AdminPanelComponent),
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
