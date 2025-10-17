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
});
