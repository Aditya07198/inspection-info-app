import { Routes } from '@angular/router';
import { OrgInspectionList as OrgLocationsList } from './components/org-locations-list/org-locations-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'org-locations-list',
        pathMatch: 'full'
    },
    {
        path: 'org-locations-list',
        component: OrgLocationsList
    }
];
