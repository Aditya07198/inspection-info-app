import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientApiService } from '../../services/client-api.service';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-org-location-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './org-locations-edit.component.html',
  styleUrls: ['./org-locations-edit.component.scss'],
})
export class OrgLocationsEditComponent {
  form: any;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientApiService: ClientApiService
  ) {
    this.form = this.fb.group({
      location_id: [''],
      location_name: [''],
      address_1: [''],
      address_2: [''],
      unit_number: [''],
      city: [''],
      state_province: [''],
      postal_code: [''],
      country: [''],
      contact_name: [''],
      contact_mobile: [''],
      contact_office_phone: [''],
      phone_ext: [''],
      contact_fax: [''],
      contact_email: [''],
      organization_type: [''],
      created_at: [''],
      updated_at: ['']
    });
  }

  ngOnInit() {
    this.loadLocationIfNeeded();
  }

  private async loadLocationIfNeeded(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    // If id is missing or equals 'new', treat this as a create form (leave blank)
    if (!id || id === 'new') {
      return;
    }

    try {
      const resp: any = await firstValueFrom(this.clientApiService.getLocations());
      const list = Array.isArray(resp) ? resp : resp.data || [];
      const loc = list.find((l: any) => String(l.location_id) === String(id));
      if (loc) {
        this.form.patchValue(loc);
      }
    } catch (err: any) {
      console.error('Failed to load location for edit', err);
    }
  }

  onCancel() {
    this.router.navigate(['org-locations-list']);
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    try {
      if (id && id !== 'new') {
        // update existing
        await firstValueFrom(this.clientApiService.updateLocation(this.form.value.location_id, this.form.value));
      } else {
        // create new
        // await firstValueFrom(this.clientApiService.createLocation(this.form.value));
        const payload: any = { ...this.form.value };
        delete payload.location_id;

        Object.keys(payload).forEach((key) => {
        if (payload[key] === '') {
          payload[key] = null;
        }
        });

        await firstValueFrom(this.clientApiService.createLocation(payload));
      }
      this.router.navigate(['org-locations-list']);
    } catch (err: any) {
      console.error('Save failed', err);
    } finally {
      this.loading = false;
    }
  }
}
