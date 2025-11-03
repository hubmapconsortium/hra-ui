import { render, screen, RenderComponentOptions } from '@testing-library/angular';
import { PageLabelComponent } from './page-label.component';

describe('PageLabelComponent', () => {
  async function setup(inputs: RenderComponentOptions<PageLabelComponent>['inputs']) {
    return await render(PageLabelComponent, { inputs });
  }

  it('should render', async () => {
    const promise = setup({ tagline: 'Hello' });
    await expect(promise).resolves.toBeTruthy();
  });

  it('should display breadcrumbs when provided', async () => {
    await setup({
      tagline: 'Page Label',
      breadcrumbs: [{ name: 'Home', route: '/' }, { name: 'Current Page' }],
    });

    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Current Page')).toBeTruthy();
  });

  it('should display date when provided', async () => {
    await setup({
      tagline: 'Page Label',
      date: 'October 2, 2025',
    });

    expect(screen.getByText('October 2, 2025')).toBeTruthy();
  });

  it('should display tags when provided', async () => {
    await setup({
      tagline: 'Page Label',
      tags: ['Tag1', 'Tag2', 'Tag3'],
    });

    expect(screen.getByText('Tag1')).toBeTruthy();
    expect(screen.getByText('Tag2')).toBeTruthy();
    expect(screen.getByText('Tag3')).toBeTruthy();
  });

  it('should not display optional elements when not provided', async () => {
    await setup({
      tagline: 'Page Label',
    });

    expect(screen.queryByText('Home')).toBeFalsy();
    expect(screen.queryByText('October 2, 2025')).toBeFalsy();
  });
});
