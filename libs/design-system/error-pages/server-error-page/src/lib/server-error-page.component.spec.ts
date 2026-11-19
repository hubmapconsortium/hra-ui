import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { ServerErrorPageComponent } from './server-error-page.component';

describe('ServerErrorPageComponent', () => {
  const reportIssueLink = 'https://github.com/hubmapconsortium/hra-ui/issues/new';

  it('should render', async () => {
    const promise = render(ServerErrorPageComponent, {
      inputs: { reportIssueLink },
      providers: [provideRouter([])],
    });
    await expect(promise).resolves.toBeTruthy();
  });

  it('opens the report issue link in a new tab', async () => {
    await render(ServerErrorPageComponent, {
      inputs: { reportIssueLink },
      providers: [provideRouter([])],
    });

    const link = screen.getByRole('link', { name: /report issue/i });
    expect(link).toHaveAttribute('href', reportIssueLink);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
