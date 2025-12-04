import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientApiService } from '../../services/client-api.service';
import { OrgLocation } from '../../models/org-location';
import { Router } from '@angular/router';
@Component({
  selector: 'app-org-locations-list',
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './org-locations-list.component.html',
  styleUrls: ['./org-locations-list.component.scss'],
  standalone: true
})
export class OrgLocationsListComponent {
  locations: OrgLocation[] = []; 

  constructor(
    private clientApiService: ClientApiService,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientApiService.getLocations()
      .subscribe({
        next: (response) => {
          this.zone.run(() => {
            this.locations = Array.isArray(response) ? response : response.data || [];
            this.cd.detectChanges();
          });
        },
        error: (error) => {
          console.log('Error fetching locations', error);
        }
      });
  }

  onEdit(location: OrgLocation) {
    console.log('Edit clicked for', location);
    const id = (location as any).location_id ?? (location as any).id ?? '';
    this.router.navigate(['org-locations-list', String(id), 'edit']);
  }

  onAdd() {
    console.log('Add clicked');
    this.router.navigate(['org-locations-list', 'new']);
  }

  onStartInspection(location: OrgLocation) {
    console.log('Start Inspection clicked for', location);
    const id = (location as any).location_id ?? (location as any).id ?? '';
    this.router.navigate(['inspection', 'new'], { queryParams: { locationId: id } });
  }
}
