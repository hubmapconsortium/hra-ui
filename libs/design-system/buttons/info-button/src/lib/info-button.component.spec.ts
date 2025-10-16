import { render, screen, waitFor } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import {
  InfoButtonComponent,
  InfoButtonTooltipContentComponent,
  InfoButtonTooltipTaglineComponent,
} from './info-button.component';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';
import { MatButtonModule } from '@angular/material/button';

describe('InfoButtonComponent', () => {
  it('renders an info button with aria-label', async () => {
    await render(
      `
      <hra-info-button>
        <hra-info-button-tooltip-content>Test description</hra-info-button-tooltip-content>
      </hra-info-button>
    `,
      {
        imports: [InfoButtonComponent, InfoButtonTooltipContentComponent],
      },
    );

    const button = screen.getByRole('button', { name: /more information/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Click for more information');
    expect(screen.getByText('info')).toBeInTheDocument();
  });

  it('opens rich tooltip with simple content on click', async () => {
    const user = userEvent.setup();
    await render(
      `
      <hra-info-button>
        <hra-info-button-tooltip-tagline>Information Title</hra-info-button-tooltip-tagline>
        <hra-info-button-tooltip-content>This is a detailed description.</hra-info-button-tooltip-content>
      </hra-info-button>
    `,
      {
        imports: [InfoButtonComponent, InfoButtonTooltipContentComponent, InfoButtonTooltipTaglineComponent],
      },
    );

    const button = screen.getByRole('button', { name: /more information/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Information Title')).toBeInTheDocument();
      expect(screen.getByText(/detailed description/i)).toBeInTheDocument();
    });
  });

  it('closes rich tooltip when clicking outside', async () => {
    const user = userEvent.setup();
    await render(
      `
      <hra-info-button>
        <hra-info-button-tooltip-tagline>Information Title</hra-info-button-tooltip-tagline>
        <hra-info-button-tooltip-content>Test description</hra-info-button-tooltip-content>
      </hra-info-button>
    `,
      {
        imports: [InfoButtonComponent, InfoButtonTooltipContentComponent, InfoButtonTooltipTaglineComponent],
      },
    );

    const button = screen.getByRole('button', { name: /more information/i });
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
    await render(
      `
      <hra-info-button>
        <hra-info-button-tooltip-tagline>Custom Information</hra-info-button-tooltip-tagline>
        <hra-info-button-tooltip-content>
          This rich tooltip includes custom content with action buttons.
          <hra-rich-tooltip-actions>
            <button mat-button color="accent">Action 1</button>
            <button mat-button color="accent">Action 2</button>
          </hra-rich-tooltip-actions>
        </hra-info-button-tooltip-content>
      </hra-info-button>
    `,
      {
        imports: [
          InfoButtonComponent,
          InfoButtonTooltipContentComponent,
          InfoButtonTooltipTaglineComponent,
          RichTooltipModule,
          MatButtonModule,
        ],
      },
    );

    const button = screen.getByRole('button', { name: /more information/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Custom Information')).toBeInTheDocument();
      expect(screen.getByText(/custom content with action buttons/i)).toBeInTheDocument();
    });

    const actionButtons = screen.getAllByRole('button', { name: /action/i });
    expect(actionButtons).toHaveLength(2);
  });
});
