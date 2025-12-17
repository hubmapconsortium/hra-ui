import { provideMarkdown } from 'ngx-markdown';
import { render } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownComponent } from './markdown.component';
import { provideAnalytics, AnalyticsService } from '@hra-ui/common/analytics';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';

describe('MarkdownComponent', () => {
  async function setup(data?: string) {
    const user = userEvent.setup();
    const result = await render(MarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient(), provideAnalytics()],
      inputs: data ? { data } : { src: 'assets/content/changelog-page/CHANGELOG.md' },
    });

    const analyticsService = TestBed.inject(AnalyticsService);
    const logEventSpy = jest.spyOn(analyticsService, 'logEvent');

    return { ...result, user, analyticsService, logEventSpy };
  }

  it('should render', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should call logEvent when anchor is clicked', async () => {
    const { container, fixture, user, logEventSpy } = await setup('# Test\n[Link](https://example.com)');

    const component = fixture.componentInstance;

    const anchor = container.querySelector('a[href="https://example.com"]') as HTMLAnchorElement;
    expect(anchor).toBeTruthy();

    component.attachEventListeners();

    await user.click(anchor);

    expect(anchor.href).toBe('https://example.com/');
    expect(logEventSpy).toHaveBeenCalled();
  });

  it('should push listeners when attaching event listeners', async () => {
    const { container, fixture } = await setup('# Test\n[Link1](https://example.com)\n[Link2](https://example.org)');

    const component = fixture.componentInstance;

    const anchors = container.querySelectorAll('a[href^="http"]');
    expect(anchors.length).toBeGreaterThanOrEqual(2);

    component.attachEventListeners();

    expect(component['listeners'].length).toBeGreaterThan(0);
  });

  it('should call unlisten functions when clearing event listeners', async () => {
    const { container, fixture } = await setup('# Test\n[Link](https://example.com)');

    const component = fixture.componentInstance;

    const anchor = container.querySelector('a[href="https://example.com"]');
    expect(anchor).toBeTruthy();

    component.attachEventListeners();
    expect(component['listeners'].length).toBeGreaterThan(0);

    component.clearEventListeners();
    expect(component['listeners'].length).toBe(0);
  });
});
