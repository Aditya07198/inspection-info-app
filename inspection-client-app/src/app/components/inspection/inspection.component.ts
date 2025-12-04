import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientApiService } from '../../services/client-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inspection',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './inspection.component.html',
  styleUrl: './inspection.component.scss',
})
export class InspectionComponent {
  form: FormGroup;
  loading = false;
  locationId: string | null = null;
  locationName: string = '';

  inspectionStatuses = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'];
  inspectionTypes = ['INITIAL', 'FOLLOW_UP', 'RE_INSPECTION', 'ANNUAL', 'SPECIAL'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientApiService: ClientApiService,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      inspection_order_id: [''],
      location_id: [''],
      rep_id: [''],
      inquiry_id: [''],
      order_date: [''],
      scheduled_date: [''],
      completion_date: [''],
      status: ['SCHEDULED'],
      inspection_type: ['INITIAL'],
      next_due_date: [''],
      followup_start_date: [''],
      invoice_raised: [false],
      invoice_amount: [''],
      remarks: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.locationId = params['locationId'];
      if (this.locationId) {
        debugger;
        this.form.patchValue({ location_id: this.locationId });
        this.loadLocationName();
      }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      // Load existing inspection (future enhancement)
      // this.loadInspection(id);
    }
  }

  private loadLocationName() {
    if (this.locationId) {
      this.clientApiService.getLocationsById(Number(this.locationId)).subscribe({
        next: (response: any) => {
          const location = response;;
          if (response) {
            this.locationName = location.location_name || '';
             this.cd.detectChanges();
          }
        },
        error: (err) => console.error('Failed to load location', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['org-locations-list']);
  }

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.loading = true;
   const id = this.route.snapshot.paramMap.get('id');
       try {
         if (id && id !== 'new') {
           // update existing
           await firstValueFrom(this.clientApiService.createInspectionOrder(this.form.value));
         } else {
           // create new
           const payload: any = { ...this.form.value };
           delete payload.inspection_order_id;
   
           Object.keys(payload).forEach((key) => {
           if (payload[key] === '') {
             payload[key] = null;
           }
           });
   
           await firstValueFrom(this.clientApiService.createInspectionOrder(payload));
         }
      this.router.navigate(['org-locations-list']);
    } catch (err) {
      console.error('Save failed', err);
    } finally {
      this.loading = false;
    }
  }
}
