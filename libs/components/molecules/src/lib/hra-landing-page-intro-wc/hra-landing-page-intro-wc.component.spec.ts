import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HraLandingPageIntroWcComponent } from './hra-landing-page-intro-wc.component';

describe('HraLandingPageIntroWcComponent', () => {
  let component: HraLandingPageIntroWcComponent;
  let fixture: ComponentFixture<HraLandingPageIntroWcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HraLandingPageIntroWcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HraLandingPageIntroWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
