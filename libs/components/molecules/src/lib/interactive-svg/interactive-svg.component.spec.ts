import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveSvgComponent } from './interactive-svg.component';

describe('InteractiveSvgComponent', () => {
  let component: InteractiveSvgComponent;
  let fixture: ComponentFixture<InteractiveSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveSvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InteractiveSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
