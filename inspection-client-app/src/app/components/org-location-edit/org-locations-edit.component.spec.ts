import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgLocationsEditComponent } from './org-locations-edit.component';

describe('OrgInspectionList', () => {
  let component: OrgLocationsEditComponent;
  let fixture: ComponentFixture<OrgLocationsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgLocationsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgLocationsEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
