import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FlatCardActionsComponent, FlatCardComponent } from './flat-card.component';

/**
 * Metadata of FlatCardComponent.
 */
const meta: Meta<FlatCardComponent> = {
  title: 'Design System/Cards/Flat Card',
  component: FlatCardComponent,
  subcomponents: [FlatCardActionsComponent],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=8607-27441',
    },
  },
  args: {
    tagline: 'Flat Card Title',
    showButtonsFooter: true,
    showDivider: true,
    showHelpButton: true,
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, FlatCardActionsComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<FlatCardComponent>;

/**
 * Default story of the FlatCardComponent.
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <hra-flat-card
      [tagline]="tagline"
      [showButtonsFooter]="showButtonsFooter"
      [showDivider]="showDivider"
      [showHelpButton]="showHelpButton"
    >
      <div class="placeholder">placeholder content</div>
      <hra-flat-card-actions>
        <div class="buttons">
          <button mat-button>Action</button>
          <button mat-flat-button>Action</button>
        </div>
      </hra-flat-card-actions>
    </hra-flat-card>
    `,
    styles: [
      `.placeholder {
          padding: 3rem;
          gap: .5rem;
          background: vars.$outline-variant;
          height: 908px;
          text-align: center;
          font: vars.$display-small;
          letter-spacing: vars.$display-small-tracking;
          color: vars.$tertiary;
      }

      .buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }`,
    ],
  }),
};
