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
  render: (args) => ({
    props: args,
    template: `
      <hra-info-message-indicator>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex odio, imperdiet eu condimentum
         ac, euismod sed metus. Phasellus tincidunt ipsum lorem, eu mattis erat facilisis eget.
      </hra-info-message-indicator>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
