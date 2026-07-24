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

  it.each([
    ['markdown backticks', 'Use `part_of` relationships.'],
    ['an HTML code element', 'Use <code>part_of</code> relationships.'],
  ])('should render inline code authored with %s', async (_, data) => {
    const { container } = await setup(data);

    const code = container.querySelector('code');
    expect(code).toHaveTextContent('part_of');
    expect(code?.matches(':not(pre) > code')).toBe(true);
  });

  it('should keep fenced code blocks separate from inline code', async () => {
    const { container } = await setup('```\nconst relationship = "part_of";\n```');

    const code = container.querySelector('pre > code');
    expect(code).toHaveTextContent('const relationship = "part_of";');
    expect(code?.matches(':not(pre) > code')).toBe(false);
  });

  it('should render inline code inside a link', async () => {
    const { container } = await setup('[`part_of`](https://example.com)');

    expect(container.querySelector('a > code')).toHaveTextContent('part_of');
  });

  it('should preserve long inline code values that may wrap', async () => {
    const value = 'a-very-long-machine-readable-relationship-identifier-that-may-wrap';
    const { container } = await setup(`Use \`${value}\` in the query.`);

    expect(container.querySelector('code')).toHaveTextContent(value);
  });
});
