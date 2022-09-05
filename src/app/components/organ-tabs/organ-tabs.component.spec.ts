import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganTabsComponent } from './organ-tabs.component';

describe('OrganTabsComponent', () => {
  let component: OrganTabsComponent;
  let fixture: ComponentFixture<OrganTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
