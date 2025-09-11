import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsentBannerComponent } from './consent-banner.component';

describe('ConsentBannerComponent', () => {
  let component: ConsentBannerComponent;
  let fixture: ComponentFixture<ConsentBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsentBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsentBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
