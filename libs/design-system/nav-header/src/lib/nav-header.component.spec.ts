import { render, screen } from '@testing-library/angular';
import { NavHeaderComponent } from './nav-header.component';

describe('NavHeaderComponent', () => {
  const link = 'example.com';
  const icon = 'icon.svg';
  const title = 'test title';

  beforeEach(async () => {
    await render(NavHeaderComponent, {
      componentInputs: {
        link: link,
        icon: icon,
        title: title,
        description: 'Test Description',
      },
    });
  });

  it('should render header', () => {
    expect(screen.getByText('test title')).toBeInTheDocument();
  });

  it('should render description', () => {
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
