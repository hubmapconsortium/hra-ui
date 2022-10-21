import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HraUsageMetricsComponent } from './hra-usage-metrics.component';

describe('HraUsageMetricsComponent', () => {
  let component: HraUsageMetricsComponent;
  let fixture: ComponentFixture<HraUsageMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HraUsageMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HraUsageMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
