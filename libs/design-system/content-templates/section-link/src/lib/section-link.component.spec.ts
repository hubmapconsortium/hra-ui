import { render } from '@testing-library/angular';
import { SectionLinkComponent } from './section-link.component';

describe('SectionLinkComponent', () => {
  it('should render', async () => {
    const promise = render(SectionLinkComponent);
    await expect(promise).resolves.toBeTruthy();
  });
});
