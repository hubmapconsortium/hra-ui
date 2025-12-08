import { ViewportScroller } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConsentService } from '@hra-ui/common/analytics';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { AppComponent } from './app.component';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockViewportScroller: Partial<ViewportScroller>;

  beforeEach(async () => {
    mockViewportScroller = {
      setOffset: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([{ path: '', component: AppComponent }]),
        provideHttpClient(),
        { provide: ViewportScroller, useValue: mockViewportScroller },
        { provide: CustomScrollService, useValue: {} },
        { provide: ConsentService, useValue: { categories: jest.fn(), updateCategories: jest.fn() } },
        { provide: PrivacyPreferencesService, useValue: { launch: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set viewport scroller offset on initialization', () => {
    fixture.detectChanges();
    expect(mockViewportScroller.setOffset).toHaveBeenCalled();
  });

  it('should render header component', () => {
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('hra-header');
    expect(header).toBeTruthy();
  });

  it('should render router outlet', () => {
    fixture.detectChanges();
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('should apply cta-active class when CTA is not dismissed', () => {
    fixture.detectChanges();
    const mainDiv = fixture.nativeElement.querySelector('.main');
    expect(mainDiv?.classList.contains('cta-active')).toBe(true);
  });

  it('should remove cta-active class when CTA is dismissed', () => {
    fixture.detectChanges();
    (component as unknown as { ctaDismissed: { set: (value: boolean) => void } }).ctaDismissed.set(true);
    fixture.detectChanges();

    const mainDiv = fixture.nativeElement.querySelector('.main');
    expect(mainDiv?.classList.contains('cta-active')).toBe(false);
  });

  it('should have content wrapper', () => {
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.content');
    expect(content).toBeTruthy();
  });
});
