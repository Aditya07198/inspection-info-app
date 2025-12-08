import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { ClientApiService } from '../../services/client-api.service';

@Component({
  selector: 'app-reps-list',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './reps-list.component.html',
  styleUrls: ['./reps-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default, // same as locations
})
export class RepsListComponent {
  reps: any[] = [];
  loading = true;

  constructor(
    private clientApiService: ClientApiService,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientApiService.getReps().subscribe({
      // NOTE: response typed as any → no "never.data" error
      next: (response: any) => {
        // EXACT same pattern as locations:
        this.zone.run(() => {
          this.reps = Array.isArray(response) ? response : response.data || [];
          this.loading = false;
          this.cd.detectChanges();
        });
      },
      error: (error) => {
        console.error('Error fetching reps', error);
        this.zone.run(() => {
          this.reps = [];
          this.loading = false;
          this.cd.detectChanges();
        });
      },
    });
  }

  onEdit(rep: any): void {
    const id = (rep as any).rep_id ?? (rep as any).id ?? '';
    this.router.navigate(['/reps', String(id)]);
  }

  onAdd(): void {
    this.router.navigate(['/reps', 'new']);
  }
}
