import { render, screen } from '@testing-library/angular';
import { NavHeaderComponent, NavInfo } from './nav-header.component';

describe('NavHeaderComponent', () => {
  const testNavHeaderData: NavInfo = {
    link: 'example.com',
    icon: 'icon.svg',
    title: 'test title',
  };

  beforeEach(async () => {
    await render(NavHeaderComponent, {
      componentInputs: {
        navInfo: testNavHeaderData,
      },
    });
  });

  it('should render header', () => {
    expect(screen.getByText('test title')).toBeInTheDocument();
  });
});
