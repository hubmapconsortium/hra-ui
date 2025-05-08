import { render } from '@testing-library/angular';
import { PageLabelComponent } from './page-label.component';

describe('PageLabelComponent', () => {
  it('should render', async () => {
    const promise = render(PageLabelComponent, { inputs: { tagline: 'Hello' } });
    await expect(promise).resolves.toBeTruthy();
  });
});
