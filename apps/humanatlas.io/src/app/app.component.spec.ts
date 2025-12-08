import { ViewportScroller } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ConsentService } from '@hra-ui/common/analytics';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('AppComponent', () => {
  const mockViewportScroller: Partial<ViewportScroller> = {
    setOffset: jest.fn(),
  };

  const renderComponent = async () => {
    return render(AppComponent, {
      providers: [
        provideRouter([{ path: '', component: AppComponent }]),
        provideHttpClient(),
        { provide: ViewportScroller, useValue: mockViewportScroller },
        { provide: CustomScrollService, useValue: {} },
        { provide: ConsentService, useValue: { categories: jest.fn(), updateCategories: jest.fn() } },
        { provide: PrivacyPreferencesService, useValue: { launch: jest.fn() } },
      ],
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set viewport scroller offset on initialization', async () => {
    await renderComponent();
    expect(mockViewportScroller.setOffset).toHaveBeenCalled();
  });

  it('should render header component', async () => {
    await renderComponent();
    const headers = screen.getAllByRole('banner');
    expect(headers[0]).toBeInTheDocument();
  });

  it('should render router outlet', async () => {
    const { container } = await renderComponent();
    const outlet = container.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('should apply cta-active class when CTA is not dismissed', async () => {
    const { container } = await renderComponent();
    const mainDiv = container.querySelector('.main');
    expect(mainDiv?.classList.contains('cta-active')).toBe(true);
  });

  it('should remove cta-active class when CTA is dismissed', async () => {
    const { fixture, container } = await renderComponent();
    const component = fixture.componentInstance as unknown as {
      ctaDismissed: { set: (value: boolean) => void };
    };

    component.ctaDismissed.set(true);
    fixture.detectChanges();

    const mainDiv = container.querySelector('.main');
    expect(mainDiv?.classList.contains('cta-active')).toBe(false);
  });

  it('should have content wrapper', async () => {
    const { container } = await renderComponent();
    const content = container.querySelector('.content');
    expect(content).toBeTruthy();
  });
});
