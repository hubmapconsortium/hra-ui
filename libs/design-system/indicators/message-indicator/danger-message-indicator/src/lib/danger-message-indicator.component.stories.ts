import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DangerMessageIndicatorComponent } from './danger-message-indicator.component';

const meta: Meta = {
  title: 'Design System/Indicators/Message Indicators/Danger Message Indicator',
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3277-186',
      },
    ],
  },
  decorators: [
    moduleMetadata({
      imports: [DangerMessageIndicatorComponent],
    }),
  ],
  args: {
    message:
      'Hey! This is a danger message indicator. It is used to indicate a dangerous or potentially harmful situation.',
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'The message to be displayed in the danger message indicator.',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-danger-message-indicator>
         {{ message }}
      </hra-danger-message-indicator>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
