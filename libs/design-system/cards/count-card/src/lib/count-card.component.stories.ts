import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CountCardComponent } from './count-card.component';

import { CategoryLogoComponent } from '@hra-ui/design-system/brand/category-logo';

/**
 * Metadata of CountCardComponent.
 */
const meta: Meta<CountCardComponent> = {
  title: 'Design System/Cards/Count Card',
  component: CountCardComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=8607-27441',
    },
  },
  args: {
    count: 1,
    label: 'Count Card Title',
    categoryIcon: 'category',
  },
  decorators: [
    moduleMetadata({
      imports: [CategoryLogoComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<CountCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hra-count-card
        [count]="count"
        [label]="label"
        [category]="category"
      >
        <div class="placeholder">placeholder content</div>
      </hra-count-card>
    `,
    styles: [
      `.placeholder {
          padding: 3rem;
          gap: .5rem;
          background: var(--mat-sys-outline-variant);
          height: 908px;
          text-align: center;
          font: var(--mat-sys-display-small);
          letter-spacing: var(--mat-sys-display-small-tracking);
        }`,
    ],
  }),
};
