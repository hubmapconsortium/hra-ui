import { render } from '@testing-library/angular';
import { ServerErrorPageComponent } from './server-error-page.component';

describe('ServerErrorPageComponent', () => {
  it('should render', async () => {
    const promise = render(ServerErrorPageComponent, {
      inputs: {
        reportIssueLink: '/report-issue',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
