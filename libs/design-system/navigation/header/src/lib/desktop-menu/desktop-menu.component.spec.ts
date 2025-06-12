import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { HUBMAP_MENU, MENUS } from '../static-data/parsed';
import { DesktopMenuComponent } from './desktop-menu.component';

describe('DesktopMenuComponent', () => {
  it('should render a hubmap menu', async () => {
    await render(DesktopMenuComponent, {
      inputs: { menu: HUBMAP_MENU, baseUrl: undefined },
    });

    const item = HUBMAP_MENU[0].items[0];
    screen.getByText(item.label);
  });

  it('should render a menu', async () => {
    await render(DesktopMenuComponent, {
      inputs: { menu: MENUS[0], baseUrl: 'https://humanatlas.io/' },
    });

    const group = MENUS[0].items?.find((item) => item.type === 'group');
    screen.getByText(group?.label ?? '');
  });
});
