import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeLegendComponent } from './size-legend.component';

describe('SizeLegendComponent', () => {
  let component: SizeLegendComponent;
  let fixture: ComponentFixture<SizeLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeLegendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SizeLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
