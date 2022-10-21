import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfAsctbAzimuthComponent } from './ccf-asctb-azimuth.component';

describe('CcfAsctbAzimuthComponent', () => {
  let component: CcfAsctbAzimuthComponent;
  let fixture: ComponentFixture<CcfAsctbAzimuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcfAsctbAzimuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcfAsctbAzimuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
