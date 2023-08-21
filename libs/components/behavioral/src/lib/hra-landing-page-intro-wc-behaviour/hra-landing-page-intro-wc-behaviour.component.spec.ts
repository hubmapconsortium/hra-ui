import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HraLandingPageIntroWcBehaviourComponent } from './hra-landing-page-intro-wc-behaviour.component';

describe('HraLandingPageIntroWcBehaviourComponent', () => {
  let component: HraLandingPageIntroWcBehaviourComponent;
  let fixture: ComponentFixture<HraLandingPageIntroWcBehaviourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HraLandingPageIntroWcBehaviourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HraLandingPageIntroWcBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
