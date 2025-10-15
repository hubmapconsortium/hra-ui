import { render, screen } from '@testing-library/angular';
import { ActionCardComponent, ActionCardActionComponent } from './action-card.component';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

describe('ActionCardComponent', () => {
  it('should create', async () => {
    const promise = render(ActionCardComponent, {
      inputs: {
        variant: 'elevated',
        tagline: 'Title',
      },
    });

    await expect(promise).resolves.toBeTruthy();
  });

  it('should set the correct alignment for the action', async () => {
    await render(
      `<hra-action-card variant="elevated" tagline="Title">
        <hra-action-card-action>
          <button mat-button>
            Action 1
          </button>
        </hra-action-card-action>
        <hra-action-card-action alignment="right">
          <button mat-flat-button>
            Action 2
          </button>
        </hra-action-card-action>
      </hra-action-card>`,
      {
        imports: [ActionCardComponent, ActionCardActionComponent, ButtonsModule],
      },
    );

    const button1 = screen.getByRole('button', { name: 'Action 1' });
    expect(button1.parentElement?.nextElementSibling).toHaveClass('spacer');

    const button2 = screen.getByRole('button', { name: 'Action 2' });
    expect(button2.parentElement?.previousElementSibling).toHaveClass('spacer');
  });

  describe('Gallery variant', () => {
    it('should render gallery variant with all inputs', async () => {
      await render(ActionCardComponent, {
        inputs: {
          variant: 'gallery',
          tagline: 'Gallery Card Title',
          date: 'January 15, 2025',
          taglineUrl: 'https://example.com',
          taglineExternal: true,
          categoryTag: 'Research',
          projectTag: 'HRA',
          image: 'path/to/image.jpg',
          imageAlt: 'Gallery image description',
        },
      });

      expect(screen.getByText('January 15, 2025')).toBeInTheDocument();
      expect(screen.getByText('Gallery Card Title')).toBeInTheDocument();
      expect(screen.getByText('Research')).toBeInTheDocument();
      expect(screen.getByText('HRA')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Gallery image description');
    });

    it('should render tagline as link with correct target when taglineUrl is provided', async () => {
      await render(ActionCardComponent, {
        inputs: {
          variant: 'gallery',
          tagline: 'External Link',
          taglineUrl: 'https://example.com',
          taglineExternal: true,
        },
      });

      const link = screen.getByRole('link', { name: 'External Link' });
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
