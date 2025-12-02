import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLocationsListComponent } from './org-locations-list.component';

describe('OrgLocationsList', () => {
  let component: OrgLocationsListComponent;
  let fixture: ComponentFixture<OrgLocationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgLocationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgLocationsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
