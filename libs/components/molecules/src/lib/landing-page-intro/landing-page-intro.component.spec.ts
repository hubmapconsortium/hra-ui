import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageIntroComponent } from './landing-page-intro.component';

describe('LandingPageIntroComponent', () => {
  let component: LandingPageIntroComponent;
  let fixture: ComponentFixture<LandingPageIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageIntroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
