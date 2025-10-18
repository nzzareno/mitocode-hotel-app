import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LayoutComponent,
    }
];
