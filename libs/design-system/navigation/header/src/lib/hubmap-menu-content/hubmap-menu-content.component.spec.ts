import { render, screen } from '@testing-library/angular';
import { HUBMAP_MENU } from '../static-data/parsed';
import { HubmapMenuContentComponent } from './hubmap-menu-content.component';

describe('HubmapMenuContentComponent', () => {
  it('renders menu items', async () => {
    await render(HubmapMenuContentComponent, {
      inputs: { menu: HUBMAP_MENU },
    });

    const item = HUBMAP_MENU.groups[0].items[0];
    screen.getByText(item.label);
  });
});
