import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgInspectionList } from './org-inspection-list';

describe('OrgInspectionList', () => {
  let component: OrgInspectionList;
  let fixture: ComponentFixture<OrgInspectionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgInspectionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgInspectionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
