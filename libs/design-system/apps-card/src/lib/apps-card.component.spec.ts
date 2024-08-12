import { render, screen } from '@testing-library/angular';
import { AppsCardComponent } from './apps-card.component';

describe('AppsCardComponent', () => {
  beforeEach(async () => {
    await render(AppsCardComponent, {
      componentInputs: {
        icon: 'test.svg',
        title: 'Test Title',
        description: 'Test Description',
      },
    });
  });

  it('should create and render the card', async () => {
    const brandLink = screen.getByRole('img');
    expect(brandLink.getAttribute('alt')).toBe('Test Title Icon');
    expect(brandLink.getAttribute('src')).toBe('test.svg');
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
