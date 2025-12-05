import { render, screen } from '@testing-library/angular';
import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {
  it('should create and render with label and disabled state', async () => {
    const { fixture } = await render(NavItemComponent, {
      componentInputs: { label: 'Home', disabled: true },
    });

    expect(fixture.componentInstance).toBeTruthy();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });

  it('should render projected content', async () => {
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
