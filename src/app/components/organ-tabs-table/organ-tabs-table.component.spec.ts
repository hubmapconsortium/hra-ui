import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganTabsTableComponent } from './organ-tabs-table.component';

describe('OrganTabsTableComponent', () => {
  let component: OrganTabsTableComponent;
  let fixture: ComponentFixture<OrganTabsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganTabsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganTabsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
