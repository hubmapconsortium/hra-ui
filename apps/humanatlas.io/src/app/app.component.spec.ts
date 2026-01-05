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
    await renderComponent();
    const headers = screen.getAllByRole('banner');
    expect(headers[0]).toBeInTheDocument();
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
    await renderComponent();
    const outlet = document.querySelector('router-outlet');
    expect(outlet).toBeInTheDocument();
  });

  it('should apply cta-active class when CTA is not dismissed', async () => {
    await renderComponent();
    const mainDiv = document.querySelector('.main');
    expect(mainDiv).toHaveClass('cta-active');
  });

  it('should have main div with appropriate classes', async () => {
    await renderComponent();
    const mainDiv = document.querySelector('.main');
    expect(mainDiv).toBeInTheDocument();
  });

  it('should have content wrapper', async () => {
    await renderComponent();
    const content = document.querySelector('.content');
    expect(content).toBeInTheDocument();
  });
});
