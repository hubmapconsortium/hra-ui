import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HraSopComponent } from './hra-sop.component';

describe('HraSopComponent', () => {
  let component: HraSopComponent;
  let fixture: ComponentFixture<HraSopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HraSopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HraSopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
