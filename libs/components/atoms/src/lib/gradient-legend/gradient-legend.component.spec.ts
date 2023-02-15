import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientLegendComponent } from './gradient-legend.component';

describe('GradientLegendComponent', () => {
  let component: GradientLegendComponent;
  let fixture: ComponentFixture<GradientLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientLegendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradientLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
