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
  render: (args) => ({
    props: args,
    template: `
      <hra-danger-message-indicator>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex odio, imperdiet eu condimentum
         ac, euismod sed metus. Phasellus tincidunt ipsum lorem, eu mattis erat facilisis eget.
      </hra-danger-message-indicator>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
