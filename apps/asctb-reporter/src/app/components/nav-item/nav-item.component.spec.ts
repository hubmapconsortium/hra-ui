import { render, screen } from '@testing-library/angular';
import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {
  it('renders label when provided via inputs', async () => {
    await render(NavItemComponent, {
      inputs: { label: 'Home', disabled: true },
    });

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders projected content', async () => {
    await render(
      `
      <app-nav-item>
        <span data-testid="message">message</span>
      </app-nav-item>
      `,
      {
        imports: [NavItemComponent],
      },
    );

    expect(screen.getByTestId('message')).toBeInTheDocument();
  });
});
