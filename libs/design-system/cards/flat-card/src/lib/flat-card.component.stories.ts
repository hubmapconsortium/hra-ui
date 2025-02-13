import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FlatCardComponent } from './flat-card.component';

const meta: Meta = {
  component: FlatCardComponent,
  title: 'Design System/Cards/FlatCardComponent',
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=8607-27441',
    },
  },
};
export default meta;
type Story = StoryObj<FlatCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <hra-flat-card title="Component Title" leftButtonText="Action" [isButtonDisabled]=true rightButtonText="Action" [showHelpButton]=true [showDivider]=true [showButtonsFooter]=true>
      <div class="placeholder">placeholder content</div>
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
