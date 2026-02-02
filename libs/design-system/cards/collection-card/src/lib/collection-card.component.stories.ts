import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { GridContainerComponent } from '../../../../content-templates/grid-container/src/lib/grid-container.component';
import { CollectionCardActionComponent, CollectionCardComponent } from './collection-card.component';

interface WithContent {
  content?: string;
}

const meta: Meta<CollectionCardComponent & WithContent> = {
  title: 'Design System/Cards/Collection Card',
  component: CollectionCardComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1309-2257',
    },
  },
  args: {
    image: 'assets/ui-images/placeholder.png',
    tagline: 'Label',
    content: 'This is a placeholder one sentence short description and ideally it contains less than 125 characters.',
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, MatIconModule, CollectionCardActionComponent, GridContainerComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<CollectionCardComponent & WithContent>;

export const CollectionCard: Story = {
  args: {
    tagline: 'Tagline',
    icons: ['misc:data'],
    taglineChips: ['Tag 1', 'Tag 2'],
  },
  render: (args) => ({
    props: args,
    template: `
        <hra-collection-card [tagline]="tagline" [image]="image" [icons]="icons" [chips]="chips">
          <div>
            <div class="label">Label</div>
            <div class="supporting-text">Supporting Text</div>
              <mat-chip-set aria-label="Chip with icon">
                <mat-chip hraChipSize="medium">
                  Label
                </mat-chip>
                <mat-chip hraChipSize="medium">
                  Label
                </mat-chip>
              </mat-chip-set>
          </div>
          <hra-collection-card-action>
            <div class="left-actions">
              <button mat-flat-button hraButtonSize="medium" disabled="false">
                Action
              </button>
              <button mat-icon-button hraIconButtonSize="large" hraIconButtonVariant="dark">
                <mat-icon>more_vert</mat-icon>
              </button>
            </div>
          </hra-collection-card-action>
          <hra-collection-card-action alignment="right">
            <button mat-button hraButtonSize="medium" disabled="false">
                Action
            </button>
          </hra-collection-card-action>
        </hra-collection-card>
    `,
    styles: [
      `
      .label {
        font: var(--mat-sys-label-large);
      }

      .supporting-text {
        font: var(--mat-sys-label-medium);
        margin-bottom: 0.75rem;
      }

      .left-actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }`,
    ],
  }),
};
