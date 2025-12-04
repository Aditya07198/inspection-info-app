import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionComponent } from './inspection.component';

describe('Inspection', () => {
  let component: InspectionComponent;
  let fixture: ComponentFixture<InspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
