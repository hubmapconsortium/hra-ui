import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganVersionComponent } from './organ-version.component';

describe('OrganVersionComponent', () => {
  let component: OrganVersionComponent;
  let fixture: ComponentFixture<OrganVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
