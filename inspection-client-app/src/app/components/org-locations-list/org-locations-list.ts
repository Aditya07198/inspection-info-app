import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ClientApiService } from '../../services/client-api.service';
import { OrgLocation } from '../../models/org-location';
@Component({
  selector: 'app-org-locations-list',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './org-locations-list.html',
  styleUrls: ['./org-locations-list.scss'],
  standalone: true
})
export class OrgInspectionList {
  locations: OrgLocation[] = []; 

  constructor(
    private clientApiService: ClientApiService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
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
}
