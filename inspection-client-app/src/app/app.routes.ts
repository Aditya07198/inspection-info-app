import { Routes } from '@angular/router';
import { OrgInspectionList } from './components/org-inspection-list/org-inspection-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'org-inspection-list',
        pathMatch: 'full'
    },
    {
        path: 'org-inspection-list',
        component: OrgInspectionList
    }
];
