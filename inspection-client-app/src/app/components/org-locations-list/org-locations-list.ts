import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ClientApiService } from '../../services/client-api.service';
import { OrgLocation } from '../../models/org-location';
@Component({
  selector: 'app-org-locations-list',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './org-locations-list.html',
  styleUrl: './org-locations-list.scss',
})
export class OrgInspectionList {
  locations: OrgLocation[] = []; 

  constructor(private clientApiService: ClientApiService) {

  }

  ngOnInit() {
    this.clientApiService.getLocations()
    .pipe()
    .subscribe({
      next: (response) => {
       console.log(response);
        this.locations = response;
      },
      error: (error) => {
        console.log('Error fetching locations', error);
      }
    })
  }
}
