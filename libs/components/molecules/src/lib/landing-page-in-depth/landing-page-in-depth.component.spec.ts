import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageInDepthComponent } from './landing-page-in-depth.component';

describe('LandingPageInDepthComponent', () => {
  let component: LandingPageInDepthComponent;
  let fixture: ComponentFixture<LandingPageInDepthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageInDepthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageInDepthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
