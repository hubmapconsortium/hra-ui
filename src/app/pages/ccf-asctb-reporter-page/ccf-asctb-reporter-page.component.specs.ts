import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfReporterPageComponent } from './ccf-asctb-reporter-page.component';

describe('CcfTablePageComponent', () => {
  let component: CcfReporterPageComponent;
  let fixture: ComponentFixture<CcfReporterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcfReporterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcfReporterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
