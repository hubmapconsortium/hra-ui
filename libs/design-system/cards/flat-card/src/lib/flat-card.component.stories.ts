import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FlatCardActionsComponent, FlatCardComponent } from './flat-card.component';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

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
      imports: [ButtonsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<FlatCardComponent>;

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
        <button mat-button>Action</button>
      </hra-flat-card-actions>
    </hra-flat-card>
    `,
    styles: [
      `.placeholder {
          padding: 3rem;
          gap: .5rem;
          background: var(--sys-outline-variant);
          height: 908px;
          text-align: center;
          font: var(--sys-display-small);
          letter-spacing: var(--sys-display-small-tracking);
          color: var(--sys-tertiary);
      }`,
    ],
  }),
};
