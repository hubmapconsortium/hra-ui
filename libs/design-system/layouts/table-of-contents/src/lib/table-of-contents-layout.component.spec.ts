import { provideTableOfContentsOptions } from '@hra-ui/design-system/navigation/table-of-contents';
import { render } from '@testing-library/angular';
import { TableOfContentsLayoutComponent } from './table-of-contents-layout.component';

describe('TableOfContentsLayoutComponent', () => {
  it('should create', async () => {
    const promise = render(TableOfContentsLayoutComponent);
    await expect(promise).resolves.toBeTruthy();
  });

  it('should render links as a Material navigation list when enabled', async () => {
    const { container } = await render(TableOfContentsLayoutComponent, {
      providers: [provideTableOfContentsOptions({ navList: true })],
    });
    expect(container.querySelector('mat-nav-list')).toBeTruthy();
    expect(container.querySelector('.links')).toBeNull();
  });
});
