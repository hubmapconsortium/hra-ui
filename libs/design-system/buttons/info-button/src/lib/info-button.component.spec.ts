import { render, screen, waitFor } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { Component } from '@angular/core';
import { InfoButtonComponent } from './info-button.component';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';
import { MatButtonModule } from '@angular/material/button';

/**
 * Host component to test custom rich tooltip content with action buttons.
 */
@Component({
  standalone: true,
  imports: [InfoButtonComponent, RichTooltipModule, MatButtonModule],
  template: `
    <hra-rich-tooltip-container #content>
      <hra-rich-tooltip-tagline>Custom Information</hra-rich-tooltip-tagline>
      <hra-rich-tooltip-content>
        This rich tooltip includes custom content with action buttons.
      </hra-rich-tooltip-content>
      <hra-rich-tooltip-actions>
        <button mat-button color="accent">Action 1</button>
        <button mat-button color="accent">Action 2</button>
      </hra-rich-tooltip-actions>
    </hra-rich-tooltip-container>

    <hra-info-button [richTooltipContent]="content" />
  `,
})
class HostWithCustomTooltipComponent {}

describe('InfoButtonComponent', () => {
  it('renders an info button with aria-label', async () => {
    await render(InfoButtonComponent, {
      inputs: {
        richTooltipTagline: 'Test Title',
        richTooltipDescription: 'Test Description',
      },
    });

    const button = screen.getByRole('button', { name: /info/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Info');
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('opens rich tooltip with simple content on click', async () => {
    const user = userEvent.setup();
    await render(InfoButtonComponent, {
      inputs: {
        richTooltipTagline: 'Information Title',
        richTooltipDescription: 'This is a detailed description.',
      },
    });

    const button = screen.getByRole('button', { name: /info/i });

    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Information Title')).toBeInTheDocument();
      expect(screen.getByText(/detailed description/i)).toBeInTheDocument();
    });
  });

  it('closes rich tooltip when clicking outside', async () => {
    const user = userEvent.setup();
    await render(InfoButtonComponent, {
      inputs: {
        richTooltipTagline: 'Information Title',
        richTooltipDescription: 'Test description',
      },
    });

    const button = screen.getByRole('button', { name: /info/i });

    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText('Information Title')).toBeInTheDocument();
    });

    await user.click(document.body);
    await waitFor(() => {
      expect(screen.queryByText('Information Title')).not.toBeInTheDocument();
    });
  });

  it('opens rich tooltip with custom content and action buttons', async () => {
    const user = userEvent.setup();
    await render(HostWithCustomTooltipComponent);

    const button = screen.getByRole('button', { name: /info/i });

    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Custom Information')).toBeInTheDocument();
      expect(screen.getByText(/custom content with action buttons/i)).toBeInTheDocument();
    });

    const actionButtons = screen.getAllByRole('button', { name: /action/i });
    expect(actionButtons).toHaveLength(2);
  });
});
