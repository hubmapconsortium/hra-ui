import { render } from '@testing-library/angular';
import { TableOfContentsLayoutComponent } from './table-of-contents-layout.component';

describe('TableOfContentsLayoutComponent', () => {
  it('should create', async () => {
    const promise = render(TableOfContentsLayoutComponent);
    await expect(promise).resolves.toBeTruthy();
  });
});
