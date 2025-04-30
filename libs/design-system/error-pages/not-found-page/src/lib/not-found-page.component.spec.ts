import { render } from '@testing-library/angular';
import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
  it('should render', async () => {
    const promise = render(NotFoundPageComponent, {});
    await expect(promise).resolves.toBeTruthy();
  });
});
