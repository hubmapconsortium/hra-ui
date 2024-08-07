import { render, screen } from '@testing-library/angular';
import { HubmapNavItems } from './hubmap-nav';
import { HubmapNavComponent } from './hubmap-nav.component';

describe('HubmapNavComponent', () => {
  const TEST_HUBMAP_NAV_DATA: HubmapNavItems[] = [
    {
      menuName: 'Test Menu Name',
      card: [
        {
          title: 'Test Card Title',
        },
      ],
    },
  ];
  beforeEach(async () => {
    await render(HubmapNavComponent, {
      componentInputs: {
        navItems: TEST_HUBMAP_NAV_DATA,
      },
    });
  });

  it('should render the hubmap nav menu with provided data', () => {
    expect(screen.getByText('Test Menu Name')).toBeDefined();
    expect(screen.getByText('Test Card Title')).toBeDefined();
  });
});
