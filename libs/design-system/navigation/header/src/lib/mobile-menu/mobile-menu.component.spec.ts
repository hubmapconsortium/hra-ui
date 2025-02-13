import { render, screen } from '@testing-library/angular';
import { HUBMAP_MENU, MENUS } from '../static-data/parsed';
import { MobileMenuComponent } from './mobile-menu.component';

describe('MobileMenuComponent', () => {
  it('should render all menus', async () => {
    await render(MobileMenuComponent, {
      inputs: { hubmapMenu: HUBMAP_MENU, menus: MENUS },
    });

    for (const menu of MENUS.menus) {
      const group = menu.items.find((item) => item.type === 'group');
      screen.getByText(group?.label ?? '');
    }

    screen.getByText(HUBMAP_MENU.groups[0].label);
  });
});
