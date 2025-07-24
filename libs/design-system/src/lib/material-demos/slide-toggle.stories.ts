import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Design System/Slide Toggle',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=10842-16912',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatSlideToggleModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    isChecked: true,
    isDisabled: false,
    hideIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <mat-slide-toggle
        [checked]="${args['isChecked']}"
        [disabled]="${args['isDisabled']}"
        [hideIcon]="${args['hideIcon']}">
      </mat-slide-toggle>
    `,
  }),
};
