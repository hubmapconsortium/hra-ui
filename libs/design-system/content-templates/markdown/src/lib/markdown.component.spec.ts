import { provideMarkdown } from 'ngx-markdown';
import { render, screen } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownComponent } from './markdown.component';
import { provideAnalytics, AnalyticsService } from '@hra-ui/common/analytics';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MarkdownComponent', () => {
  async function setup(data?: string) {
    const user = userEvent.setup();
    const result = await render(MarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient(), provideAnalytics(), provideHttpClientTesting()],
      inputs: data ? { data } : { src: 'assets/content/changelog-page/CHANGELOG.md' },
    });

    const analyticsService = TestBed.inject(AnalyticsService);
    const logEventSpy = jest.spyOn(analyticsService, 'logEvent');

    return { ...result, user, analyticsService, logEventSpy };
  }

  it('should render', async () => {
    await setup('# Test');
    expect(screen.getByRole('heading', { name: /test/i })).toBeInTheDocument();
  });

  it('should call logEvent when anchor is clicked', async () => {
    const { user, logEventSpy } = await setup('# Test\n[Link](https://example.com)');

    const anchor = await screen.findByRole('link', { name: /link/i });
    expect(anchor).toBeInTheDocument();

    await user.click(anchor);

    expect(logEventSpy).toHaveBeenCalled();
  });

  it('should render markdown heading', async () => {
    await setup('# Test\n[Link](https://example.com)');

    expect(screen.getByRole('heading', { name: /test/i })).toBeInTheDocument();
  });
});
