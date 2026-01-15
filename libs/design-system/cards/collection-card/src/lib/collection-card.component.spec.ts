import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { render, screen } from '@testing-library/angular';
import { CollectionCardActionComponent, CollectionCardComponent } from './collection-card.component';

describe('CollectionCardComponent', () => {
  it('should create', async () => {
    const promise = render(CollectionCardComponent, {
      inputs: {
        tagline: 'Title',
      },
    });

    await expect(promise).resolves.toBeTruthy();
  });

  it('should set the correct alignment for the action', async () => {
    await render(
      `<hra-collection-card tagline="Title">
        <hra-collection-card-action>
          <button mat-button>
            Action 1
          </button>
        </hra-collection-card-action>
        <hra-collection-card-action alignment="right">
          <button mat-flat-button>
            Action 2
          </button>
        </hra-collection-card-action>
      </hra-collection-card>`,
      {
        imports: [CollectionCardComponent, CollectionCardActionComponent, ButtonsModule],
      },
    );

    const button1 = screen.getByRole('button', { name: 'Action 1' });
    expect(button1.parentElement?.nextElementSibling).toHaveClass('spacer');

    const button2 = screen.getByRole('button', { name: 'Action 2' });
    expect(button2.parentElement?.previousElementSibling).toHaveClass('spacer');
  });
});
