import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { INTERSECTION_OBSERVER } from '@hra-ui/common';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, RenderResult, screen } from '@testing-library/angular';
import { mock, MockProxy } from 'jest-mock-extended';
import { CountCardComponent } from './count-card.component';

describe('CountCardComponent', () => {
  const inputs = { count: 250, suffix: '+', label: 'Datasets', icon: 'misc:data' };
  let observer: MockProxy<IntersectionObserver>;
  let observerConstructor: jest.Mock<IntersectionObserver, ConstructorParameters<typeof IntersectionObserver>>;

  async function setup(mockObserver = true): Promise<RenderResult<CountCardComponent>> {
    return render(CountCardComponent, {
      inputs,
      providers: [
        provideIcons(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: INTERSECTION_OBSERVER, useValue: mockObserver ? observerConstructor : undefined },
      ],
    });
  }

  function getDisplayedCount(result: RenderResult<CountCardComponent>): string | undefined {
    return result.container.querySelector('.count [aria-hidden="true"]')?.textContent?.trim();
  }

  function scrollIntoView(result: RenderResult<CountCardComponent>, intersectionRatio: number): void {
    const [callback] = observerConstructor.mock.calls[0];
    callback([{ intersectionRatio } as IntersectionObserverEntry], observer);
    result.fixture.detectChanges();
    jest.advanceTimersByTime(2000);
    result.fixture.detectChanges();
  }

  beforeEach(() => {
    observer = mock();
    observerConstructor = jest.fn().mockReturnValue(observer);
  });

  afterEach(() => {
    jest.useRealTimers();
    delete (window as Partial<Window>).matchMedia;
  });

  it('should put the final count in the text for assistive technology', async () => {
    await setup();
    expect(screen.getByText('250+')).toHaveClass('cdk-visually-hidden');
  });

  it('should show the final count when IntersectionObserver is unavailable', async () => {
    const result = await setup(false);
    expect(getDisplayedCount(result)).toBe('250+');
  });

  it('should show the final count when the user prefers reduced motion', async () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
    const result = await setup();

    expect(getDisplayedCount(result)).toBe('250+');
    expect(observerConstructor).not.toHaveBeenCalled();
  });

  it('should count up once the card is in view', async () => {
    const result = await setup();
    jest.useFakeTimers();
    expect(getDisplayedCount(result)).toBe('0+');

    scrollIntoView(result, 0.5);
    expect(getDisplayedCount(result)).toBe('250+');
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('should not count up while less than half the card is in view', async () => {
    const result = await setup();
    jest.useFakeTimers();

    scrollIntoView(result, 0.2);
    expect(getDisplayedCount(result)).toBe('0+');
    expect(observer.disconnect).not.toHaveBeenCalled();
  });
});
