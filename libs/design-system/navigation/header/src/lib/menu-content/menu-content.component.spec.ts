import { render, screen } from '@testing-library/angular';
import { MENUS } from '../static-data/parsed';
import { MenuContentComponent } from './menu-content.component';

describe('MenuContentComponent', () => {
  it('should render', async () => {
    await render(MenuContentComponent, {
      inputs: { variant: 'desktop', menu: MENUS.menus[0] },
    });

    const group = MENUS.menus[0].items?.find((item) => item.type === 'group');
    screen.getByText(group?.label ?? '');
  });
});
