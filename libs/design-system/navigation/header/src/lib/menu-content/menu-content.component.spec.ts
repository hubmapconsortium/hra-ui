import { render, screen } from '@testing-library/angular';
import { MENUS } from '../static-data/parsed';
import { MenuContentComponent } from './menu-content.component';

describe('MenuContentComponent', () => {
  it('should render', async () => {
    await render(MenuContentComponent, {
      inputs: { variant: 'desktop', menu: MENUS[0] },
    });

    const group = MENUS[0].items?.find((item) => item.type === 'group');
    screen.getByText(group?.label ?? '');
  });
});
