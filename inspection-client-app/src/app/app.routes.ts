import { Routes } from '@angular/router';
import { OrgLocationsListComponent as OrgLocationsListComponent } from './components/org-locations-list/org-locations-list.component';
import { OrgLocationsEditComponent } from './components/org-location-edit/org-locations-edit.component';
import { InspectionComponent } from './components/inspection/inspection.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'org-locations-list',
        pathMatch: 'full'
    },
    {
        path: 'org-locations-list',
        component: OrgLocationsListComponent
    }
    ,
    {
        path: 'org-locations-list/new',
        component: OrgLocationsEditComponent
    },
    {
        path: 'org-locations-list/:id/edit',
        component: OrgLocationsEditComponent
    },
    {
        path: 'inspection/:id',
        component: InspectionComponent
    }
];
