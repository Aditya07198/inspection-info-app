import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ClientApiService } from '../../services/client-api.service';
import { Rep } from '../../models/rep';

@Component({
  selector: 'app-org-reps-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './reps-edit.component.html',
  styleUrls: ['./reps-edit.component.scss'],
})
export class RepsEditComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  isNew = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientApiService: ClientApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rep_id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.email]],
      is_active: [true],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (!id || id === 'new') {
      this.isNew = true;
      return;
    }

    this.loading = true;
    this.clientApiService.getRepById(id).subscribe({
      next: (rep: Rep) => {
        if (rep) {
          this.form.patchValue(rep);
        }
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load rep', err);
        this.loading = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['reps']);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const id = this.form.value.rep_id;

    const payload: Rep = {
        first_name: this.form.value.first_name,
        last_name: this.form.value.last_name,
        phone: this.form.value.phone || null,
        email: this.form.value.email || null,
        is_active: this.form.value.is_active,
        created_at: new Date().toISOString(),
        updated_at: null
    };

    const obs = this.isNew
      ? this.clientApiService.createRep(payload)
      : this.clientApiService.updateRep(id, payload);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['reps']);
      },
      error: err => {
        console.error('Save rep failed', err);
        this.loading = false;
      },
    });
  }
}
