import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { Component } from '@angular/core';
import { HelpButtonComponent } from './help-button.component';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Host to provide a real MatMenuPanel for the `action` input.
 */
@Component({
  standalone: true,
  imports: [HelpButtonComponent, MatMenuModule],
  template: `
    <mat-menu #menu="matMenu">
      <button mat-menu-item>Docs</button>
      <button mat-menu-item>FAQ</button>
    </mat-menu>

    <hra-help-button [action]="menu" />
  `,
})
class HostWithMenuComponent {}

describe('HelpButtonComponent', () => {
  it('renders a link when `action` is a string URL', async () => {
    await render(HelpButtonComponent, {
      inputs: { action: 'https://example.com/help' },
    });

    const link = screen.getByRole('link', {
      name: /visit help and documentation page/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com/help');

    expect(screen.getByText('help')).toBeInTheDocument();
  });

  it('renders a button and opens the menu when `action` is a MatMenuPanel', async () => {
    await render(HostWithMenuComponent);

    const button = screen.getByRole('button', {
      name: /open help and documentation menu/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-haspopup', 'menu');

    await userEvent.click(button);

    const menu = await screen.findByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /docs/i })).toBeVisible();
    expect(screen.getByRole('menuitem', { name: /faq/i })).toBeVisible();
  });
});
