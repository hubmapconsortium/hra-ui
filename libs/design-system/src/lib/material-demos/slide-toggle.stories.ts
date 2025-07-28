import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta<MatSlideToggle> = {
  title: 'Design System/Slide Toggle',
  component: MatSlideToggle,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=10842-16912',
    },
  },
  args: {
    checked: true,
    disabled: false,
    hideIcon: false,
  },
  decorators: [
    moduleMetadata({
      imports: [MatSlideToggle],
    }),
  ],
};

export default meta;
type Story = StoryObj<MatSlideToggle>;

export const Default: Story = {};
