import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { InfoMessageIndicatorComponent } from './info-message-indicator.component';

const meta: Meta = {
  title: 'Design System/Indicators/Message Indicators/Info Message Indicator',
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3277-319',
      },
    ],
  },
  decorators: [
    moduleMetadata({
      imports: [InfoMessageIndicatorComponent],
    }),
  ],
  args: {
    message: 'Hey! This is an info message indicator. It is used to provide information to the user.',
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'The message to be displayed in the info message indicator.',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-info-message-indicator>
         {{ message }}
      </hra-info-message-indicator>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
